import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    home(context) {
      models.recipe
        .getAll()
        .then((response) => {
          let recipes = response.docs.map(docModifier);

          context.isRecipe = recipes.length > 0;

          let vegiRecipes = [];
          let meatRecipes = [];
          let grainRecipes = [];
          let fruitRecipes = [];
          let milkRecipes = [];

          recipes.forEach((current) => {
            let category = current.category;

            if (category === "Vegetables and legumes/beans") {
              vegiRecipes.push(current);
            } else if (category === "Fruits") {
              fruitRecipes.push(current);
            } else if (category === "Grain Food") {
              grainRecipes.push(current);
            } else if (category === "Milk, cheese, eggs and alternatives") {
              milkRecipes.push(current);
            } else if (
              category === "Lean meats and poultry, fish and alternatives"
            ) {
              meatRecipes.push(current);
            }
          });

          context.vegiRecipes = vegiRecipes;
          context.meatRecipes = meatRecipes;
          context.grainRecipes = grainRecipes;
          context.fruitRecipes = fruitRecipes;
          context.milkRecipes = milkRecipes;

          extend(context).then(function () {
            this.partial("../views/home/home.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
  },
};
