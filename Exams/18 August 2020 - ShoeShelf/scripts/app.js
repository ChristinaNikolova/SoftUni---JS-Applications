import controllers from "../controllers/index.js";

const app = new Sammy("#root", function () {
  this.use("Handlebars", "hbs");

  //Home
  this.get("#/home", controllers.home.get.home);

  //User
  //login
  this.get("#/user/login", controllers.user.get.login);
  this.post("#/user/login", controllers.user.post.login);
  //register
  this.get("#/user/register", controllers.user.get.register);
  this.post("#/user/register", controllers.user.post.register);
  //logout
  this.get("#/user/logout", controllers.user.get.logout);

  //Offer
  //create
  this.get("#/offer/create", controllers.offer.get.create);
  this.post("#/offer/create", controllers.offer.post.create);

  //details
  this.get("#/offer/details/:offerId", controllers.offer.get.details);

  //delete
  this.get("#/offer/delete/:offerId", controllers.offer.delete.delete);

  //update
  this.post("#/offer/update/:offerId", controllers.offer.put.update);
  this.get("#/offer/update/:offerId", controllers.offer.get.update);
  this.get("#/offer/buy/:offerId", controllers.offer.put.buy);
});

(() => {
  app.run("#/home");
})();
