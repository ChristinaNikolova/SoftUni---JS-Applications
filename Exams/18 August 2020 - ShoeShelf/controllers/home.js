import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    home(context) {
      models.offer
        .getAll()
        .then((response) => {
          let offers = response.docs.map(docModifier);

          context.offers = offers;

          extend(context).then(function () {
            this.partial("../views/home/home.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
  },
};
