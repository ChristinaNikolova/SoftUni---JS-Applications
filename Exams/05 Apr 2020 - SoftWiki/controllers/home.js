import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    home(context) {
      models.article
        .getAll()
        .then((response) => {
          let articles = response.docs.map(docModifier);

          let jsArticles = [];
          let cSharpArticles = [];
          let javaArticles = [];
          let pytonArticles = [];

          articles.forEach((article) => {
            let category = article.category.toLowerCase();

            if (category === "js" || category === "javascript") {
              jsArticles.push(article);
            } else if (category === "c#" || category === "csharp") {
              cSharpArticles.push(article);
            } else if (category === "java") {
              javaArticles.push(article);
            } else if (category === "pyton") {
              pytonArticles.push(article);
            }
          });

          context.jsArticles = jsArticles;
          context.cSharpArticles = cSharpArticles;
          context.javaArticles = javaArticles;
          context.pytonArticles = pytonArticles;

          extend(context).then(function () {
            this.partial("../views/home/home.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
  },
};
