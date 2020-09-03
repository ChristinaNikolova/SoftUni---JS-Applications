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
  //profilePage
  this.get("#/user/profilePage", controllers.user.get.profilePage);

  //Trek
  //create
  this.get("#/trek/create", controllers.trek.get.create);
  this.post("#/trek/create", controllers.trek.post.create);

  //details
  this.get("#/trek/details/:trekId", controllers.trek.get.details);

  //delete
  this.get("#/trek/delete/:trekId", controllers.trek.delete.delete);

  //update
  this.get("#/trek/like/:trekId", controllers.trek.put.like);
  this.post("#/trek/update/:trekId", controllers.trek.put.update);
  this.get("#/trek/update/:trekId", controllers.trek.get.update);
});

(() => {
  app.run("#/home");
})();
