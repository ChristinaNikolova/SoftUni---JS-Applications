import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";
import recipe from "../models/recipe.js";

export default {
  get: {
    share(context) {
      extend(context)
        .then(function () {
          this.partial("../views/recipe/share.hbs");
        })
        .catch((e) => console.error(e));
    },
    details(context) {
      let { recipeId } = context.params;

      models.recipe
        .details(recipeId)
        .then((response) => {
          let recipe = docModifier(response);

          context.recipe = recipe;

          Object.keys(recipe).forEach((key) => {
            context[key] = recipe[key];
          });

          context.isCreator =
            recipe.creator === localStorage.getItem("userEmail");

          extend(context).then(function () {
            this.partial("../views/recipe/details.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
    update(context) {
      let { recipeId } = context.params;

      models.recipe
        .details(recipeId)
        .then((response) => {
          let recipe = docModifier(response);

          context.recipe = recipe;

          for (const key in recipe) {
            if (key === "ingredients") {
              context[key] = recipe[key].join(", ");
              continue;
            }

            context[key] = recipe[key];
          }

          extend(context).then(function () {
            this.partial("../views/recipe/update.hbs").then(() => {
              let selectTag = document.getElementsByTagName("select")[0];

              Array.from(selectTag).forEach((child) => {
                if (child.textContent === recipe.category) {
                  child.selected = true;
                }
              });
            });
          });
        })
        .catch((e) => console.error(e));
    },
  },
  post: {
    share(context) {
      let data = {
        ...context.params,
        likesCounter: 0,
        categoryImageURL: "",
        creator: localStorage.getItem("userEmail"),
      };

      data.ingredients = data.ingredients.split(", ").map((i) => i.trim());

      models.recipe
        .create(data)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  delete: {
    delete(context) {
      let { recipeId } = context.params;

      models.recipe
        .delete(recipeId)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  put: {
    update(context) {
      let {
        recipeId,
        meal,
        ingredients,
        prepMethod,
        description,
        foodImageURL,
        category,
      } = context.params;

      models.recipe
        .details(recipeId)
        .then((response) => {
          let recipe = docModifier(response);

          recipe.meal = meal;
          recipe.prepMethod = prepMethod;
          recipe.description = description;
          recipe.foodImageURL = foodImageURL;
          recipe.category = category;
          recipe.ingredients = ingredients.split(", ").map((i) => i.trim());

          return models.recipe.update(recipeId, recipe);
        })
        .then((response) => {
          context.redirect(`#/recipe/details/${recipeId}`);
        })
        .catch((e) => console.error(e));
    },
    like(context) {
      let { recipeId } = context.params;

      models.recipe
        .details(recipeId)
        .then((response) => {
          let recipe = docModifier(response);

          recipe.likesCounter += 1;

          return models.recipe.update(recipeId, recipe);
        })
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
};
