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

  //Cause
  //allCauses
  this.get("#/cause/dashboard", controllers.cause.get.dashboard);

  //create
  this.get("#/cause/create", controllers.cause.get.create);
  this.post("#/cause/create", controllers.cause.post.create);

  //details
  this.get("#/cause/details/:causeId", controllers.cause.get.details);

  //delete
  this.get("#/cause/delete/:causeId", controllers.cause.delete.delete);

  //update
  this.post("#/cause/update/:causeId", controllers.cause.put.update);
});

(() => {
  app.run("#/home");
})();
