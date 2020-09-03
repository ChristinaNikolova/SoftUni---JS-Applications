// import extend from "../utils/context.js";
// import models from "../models/index.js";
// import docModifier from "../utils/docModifier.js";

// export default {
//   get: {},
//   post: {},
//   delete: {},
//   put: {},
// };

//////////////////////////
// export default {
//   get: {
//     dashboard(context) {
//       models.cause.getAll().then((response) => {
//         const causes = response.docs.map(docModifier);
//         context.causes = causes;

//         extend(context).then(function () {
//           this.partial("../views/cause/dashboard.hbs");
//         });
//       });
//     },

//     create(context) {
//       extend(context).then(function () {
//         this.partial("../views/cause/create.hbs");
//       });
//     },

//     details(context) {
//       const { causeId } = context.params;

//       models.cause.details(causeId).then((response) => {
//         const cause = docModifier(response);
//         context.cause = cause;

//         Object.keys(cause).forEach((key) => {
//           context[key] = cause[key];
//         });

//         context.canDonate = cause.uid !== localStorage.getItem("userId");

//         extend(context).then(function () {
//           this.partial("../views/cause/details.hbs");
//         });
//       });
//     },
//   },
//   post: {
//     create(context) {
//       let cause = {
//         ...context.params,
//         collectedFunds: 0,
//         donors: [],
//         uid: localStorage.getItem("userId"),
//       };

//       models.cause
//         .create(cause)
//         .then((response) => {
//           context.redirect("#/cause/dashboard");
//         })
//         .catch((e) => console.error(e));
//     },
//   },
//   delete: {
//     delete(context) {
//       const { causeId } = context.params;

//       models.cause
//         .delete(causeId)
//         .then((responce) => {
//           context.redirect("#/cause/dashboard");
//         })
//         .catch((e) => console.error(e));
//     },
//   },
//   put: {
//     update(context) {
//       const { causeId, currentDonation } = context.params;

//       models.cause
//         .details(causeId)
//         .then((response) => {
//           let cause = docModifier(response);
//           cause.donors.push(localStorage.getItem("userEmail"));
//           cause.collectedFunds += +currentDonation;

//           return models.cause.donate(causeId, cause);
//         })
//         .then((response) => {
//           context.redirect("#/cause/dashboard");
//         })
//         .catch((e) => console.error(e));
//     },
//   },
// };
