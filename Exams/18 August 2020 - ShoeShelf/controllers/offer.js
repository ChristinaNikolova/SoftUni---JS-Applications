import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    create(context) {
      extend(context).then(function () {
        this.partial("../views/offer/create.hbs");
      });
    },
    details(context) {
      let { offerId } = context.params;

      models.offer
        .details(offerId)
        .then((response) => {
          let offer = docModifier(response);

          context.offer = offer;

          Object.keys(offer).forEach((key) => {
            context[key] = offer[key];
          });

          context.isCreator =
            offer.creator == localStorage.getItem("userEmail");

          context.isBought = offer.buyers.some(
            (b) => b === localStorage.getItem("userEmail")
          );

          extend(context).then(function () {
            this.partial("../views/offer/details.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
    update(context) {
      let { offerId } = context.params;

      models.offer
        .details(offerId)
        .then((response) => {
          let offer = docModifier(response);

          context.offer = offer;

          Object.keys(offer).forEach((key) => {
            context[key] = offer[key];
          });

          extend(context).then(function () {
            this.partial("../views/offer/edit.hbs");
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
        buyers: [],
      };

      models.offer
        .create(data)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  delete: {
    delete(context) {
      let { offerId } = context.params;

      models.offer
        .delete(offerId)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  put: {
    buy(context) {
      let { offerId } = context.params;

      models.offer
        .details(offerId)
        .then((response) => {
          let offer = docModifier(response);

          offer.buyers.push(localStorage.getItem("userEmail"));

          return models.offer.update(offerId, offer);
        })
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
    update(context) {
      let {
        offerId,
        name,
        price,
        imageURL,
        description,
        brand,
      } = context.params;

      models.offer
        .details(offerId)
        .then((response) => {
          let offer = docModifier(response);

          offer.name = name;
          offer.price = price;
          offer.imageURL = imageURL;
          offer.description = description;
          offer.brand = brand;

          return models.offer.update(offerId, offer);
        })
        .then((response) => {
          context.redirect(`#/offer/details/${offerId}`);
        })
        .catch((e) => console.error(e));
    },
  },
};
