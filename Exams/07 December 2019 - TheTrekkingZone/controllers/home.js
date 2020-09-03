import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    home(context) {
      models.trek.getAll().then((response) => {
        let treks = response.docs.map(docModifier);

        context.treks = treks;

        extend(context).then(function () {
          this.partial("../views/home/home.hbs");
        });
      });
    },
  },
};
