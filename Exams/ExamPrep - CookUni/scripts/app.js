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

  //Recipe
  //create
  this.get("#/recipe/share", controllers.recipe.get.share);
  this.post("#/recipe/share", controllers.recipe.post.share);

  //details
  this.get("#/recipe/details/:recipeId", controllers.recipe.get.details);

  //delete
  this.get("#/recipe/delete/:recipeId", controllers.recipe.delete.delete);

  //update
  this.post("#/recipe/update/:recipeId", controllers.recipe.put.update);
  this.get("#/recipe/update/:recipeId", controllers.recipe.get.update);
  this.get("#/recipe/like/:recipeId", controllers.recipe.put.like);
});

(() => {
  app.run("#/home");
})();
