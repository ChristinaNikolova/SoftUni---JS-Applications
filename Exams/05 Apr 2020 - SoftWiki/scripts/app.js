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
  //create
  this.get("#/article/create", controllers.article.get.create);
  this.post("#/article/create", controllers.article.post.create);

  //details
  this.get("#/article/details/:articleId", controllers.article.get.details);

  //delete
  this.get("#/article/delete/:articleId", controllers.article.delete.delete);

  //update
  this.post("#/article/update/:articleId", controllers.article.put.update);
  this.get("#/article/update/:articleId", controllers.article.get.update);
});

(() => {
  app.run("#/home");
})();
