import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    dashboard(context) {
      models.idea
        .getAll()
        .then((response) => {
          let ideas = response.docs.map(docModifier);

          context.ideas = ideas;

          extend(context).then(function () {
            this.partial("../views/idea/dashboard.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
    create(context) {
      extend(context)
        .then(function () {
          this.partial("../views/idea/create.hbs");
        })
        .catch((e) => console.error(e));
    },
    details(context) {
      let { ideaId } = context.params;

      models.idea
        .details(ideaId)
        .then((response) => {
          let idea = docModifier(response);

          context.idea = idea;

          Object.keys(idea).forEach((key) => {
            context[key] = idea[key];
          });

          context.isCreator =
            idea.creator === localStorage.getItem("userEmail");

          extend(context).then(function () {
            this.partial("../views/idea/details.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
  },
  post: {
    create(context) {
      let data = {
        ...context.params,
        creator: localStorage.getItem("userEmail"),
        likes: 0,
        comments: [],
      };

      models.idea
        .create(data)
        .then((response) => {
          context.redirect("#/idea/dashboard");
        })
        .catch((e) => console.error(e));
    },
  },
  delete: {
    delete(context) {
      let { ideaId } = context.params;

      models.idea
        .delete(ideaId)
        .then((response) => {
          context.redirect("#/idea/dashboard");
        })
        .catch((e) => console.error(e));
    },
  },
  put: {
    comment(context) {
      let { ideaId, newComment } = context.params;

      models.idea
        .details(ideaId)
        .then((response) => {
          let idea = docModifier(response);

          idea.comments.push(
            `${localStorage.getItem("userEmail")} : ${newComment}`
          );

          return models.idea.update(ideaId, idea);
        })
        .then((response) => {
          context.redirect(`#/idea/details/${ideaId}`);
        })
        .catch((e) => console.error(e));
    },
    like(context) {
      let { ideaId } = context.params;

      models.idea
        .details(ideaId)
        .then((response) => {
          let idea = docModifier(response);

          idea.likes += 1;

          return models.idea.update(ideaId, idea);
        })
        .then((response) => {
          context.redirect(`#/idea/details/${ideaId}`);
        })
        .catch((e) => console.error(e));
    },
  },
};