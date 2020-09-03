import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    home(context) {
      models.post.getAll().then((response) => {
        let posts = response.docs.map(docModifier);

        context.posts = posts;

        extend(context).then(function () {
          this.partial("../views/home/home.hbs");
        });
      });
    },
  },
};
