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

  //Post
  //create
  this.post("#/post/create", controllers.post.post.create);

  //details
  this.get("#/post/details/:postId", controllers.post.get.details);

  //delete
  this.get("#/post/delete/:postId", controllers.post.delete.delete);

  //update
  this.get("#/post/update/:postId", controllers.post.get.update);
  this.post("#/post/update/:postId", controllers.post.put.update);
});

(() => {
  app.run("#/home");
})();
