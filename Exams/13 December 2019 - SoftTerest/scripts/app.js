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

  //Idea
  //allCauses
  this.get("#/idea/dashboard", controllers.idea.get.dashboard);

  //create
  this.get("#/idea/create", controllers.idea.get.create);
  this.post("#/idea/create", controllers.idea.post.create);

  //details
  this.get("#/idea/details/:ideaId", controllers.idea.get.details);

  //delete
  this.get("#/idea/delete/:ideaId", controllers.idea.delete.delete);

  //update
  this.post("#/idea/comment/:ideaId", controllers.idea.put.comment);
  this.get("#/idea/like/:ideaId", controllers.idea.put.like);
});

(() => {
  app.run("#/home");
})();
