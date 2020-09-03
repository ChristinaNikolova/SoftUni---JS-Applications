import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    create(context) {
      extend(context)
        .then(function () {
          this.partial("../views/article/create.hbs");
        })
        .catch((e) => console.error(e));
    },
    details(context) {
      let { articleId } = context.params;

      models.article
        .details(articleId)
        .then((response) => {
          let article = docModifier(response);

          context.article = article;

          Object.keys(article).forEach((key) => {
            context[key] = article[key];
          });

          context.isCreator =
            article.creator === localStorage.getItem("userEmail");

          extend(context).then(function () {
            this.partial("../views/article/details.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
    update(context) {
      let { articleId } = context.params;

      models.article
        .details(articleId)
        .then((response) => {
          let article = docModifier(response);

          context.article = article;

          Object.keys(article).forEach((key) => {
            context[key] = article[key];
          });

          extend(context).then(function () {
            this.partial("../views/article/edit.hbs");
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
      };

      models.article
        .create(data)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  delete: {
    delete(context) {
      let { articleId } = context.params;

      models.article
        .delete(articleId)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  put: {
    update(context) {
      let { articleId, title, category, content } = context.params;

      models.article
        .details(articleId)
        .then((response) => {
          let article = docModifier(response);

          article.title = title;
          article.category = category;
          article.content = content;

          return models.article.update(articleId, article);
        })
        .then((response) => {
          context.redirect(`#/article/details/${articleId}`);
        })
        .catch((e) => console.error(e));
    },
  },
};
