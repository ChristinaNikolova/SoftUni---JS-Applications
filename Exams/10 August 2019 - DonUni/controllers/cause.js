import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    create(context) {
      extend(context)
        .then(function () {
          this.partial("../views/cause/create.hbs");
        })
        .catch((e) => console.error(e));
    },
    dashboard(context) {
      models.cause
        .getAll()
        .then((response) => {
          let causes = response.docs.map(docModifier);

          context.causes = causes;

          extend(context).then(function () {
            this.partial("../views/cause/dashboard.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
    details(context) {
      let { causeId } = context.params;

      models.cause
        .details(causeId)
        .then((response) => {
          let cause = docModifier(response);

          context.cause = cause;

          Object.keys(cause).forEach((key) => {
            context[key] = cause[key];

            context.isCreator =
              cause.creator === localStorage.getItem("userEmail");

            extend(context).then(function () {
              this.partial("../views/cause/details.hbs");
            });
          });
        })
        .catch((e) => console.error(e));
    },
  },
  post: {
    create(context) {
      let data = {
        ...context.params,
        donors: [],
        collectedFunds: 0,
        creator: localStorage.getItem("userEmail"),
      };

      models.cause
        .create(data)
        .then((response) => {
          context.redirect("#/cause/dashboard");
        })
        .catch((e) => console.error(e));
    },
  },
  delete: {
    delete(context) {
      let { causeId } = context.params;

      models.cause
        .delete(causeId)
        .then((response) => {
          context.redirect("#/cause/dashboard");
        })
        .catch((e) => console.error(e));
    },
  },
  put: {
    update(context) {
      let { causeId, currentDonation } = context.params;

      models.cause
        .details(causeId)
        .then((response) => {
          let cause = docModifier(response);

          cause.donors.push(localStorage.getItem("userEmail"));
          cause.collectedFunds += +currentDonation;

          return models.cause.update(causeId, cause);
        })
        .then((response) => {
          context.redirect(`#/cause/details/${causeId}`);
        })
        .catch((e) => console.error(e));
    },
  },
};
