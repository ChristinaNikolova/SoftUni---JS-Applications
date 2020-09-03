import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    create(context) {
      extend(context).then(function () {
        this.partial("../views/trek/create.hbs");
      });
    },
    details(context) {
      let { trekId } = context.params;

      models.trek
        .details(trekId)
        .then((response) => {
          let trek = docModifier(response);

          context.trek = trek;

          Object.keys(trek).forEach((key) => {
            context[key] = trek[key];
          });

          context.isCreator =
            trek.organizer === localStorage.getItem("userEmail");

          extend(context).then(function () {
            this.partial("../views/trek/details.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
    update(context) {
      let { trekId } = context.params;

      models.trek
        .details(trekId)
        .then((response) => {
          let trek = docModifier(response);

          context.trek = trek;

          Object.keys(trek).forEach((key) => {
            context[key] = trek[key];
          });

          extend(context).then(function () {
            this.partial("../views/trek/update.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
  },
  post: {
    create(context) {
      let data = {
        ...context.params,
        organizer: localStorage.getItem("userEmail"),
        likes: 0,
      };

      models.trek
        .create(data)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  delete: {
    delete(context) {
      let { trekId } = context.params;

      models.trek
        .delete(trekId)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
  put: {
    update(context) {
      let {
        trekId,
        location,
        dateTime,
        description,
        imageURL,
      } = context.params;

      models.trek
        .details(trekId)
        .then((response) => {
          let trek = docModifier(response);

          trek.location = location;
          trek.dateTime = dateTime;
          trek.description = description;
          trek.imageURL = imageURL;

          return models.trek.update(trekId, trek);
        })
        .then((response) => {
          context.redirect(`#/trek/details/${trekId}`);
        })
        .catch((e) => console.error(e));
    },
    like(context) {
      let { trekId } = context.params;

      models.trek
        .details(trekId)
        .then((response) => {
          let trek = docModifier(response);

          trek.likes += 1;

          return models.trek.update(trekId, trek);
        })
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
};
