import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

export default {
  get: {
    login(context) {
      extend(context)
        .then(function () {
          this.partial("../views/user/login.hbs");
        })
        .catch((e) => console.error(e));
    },

    register(context) {
      extend(context)
        .then(function () {
          this.partial("../views/user/register.hbs");
        })
        .catch((e) => console.error(e));
    },

    logout(context) {
      models.user
        .logout()
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },

    profilePage(context) {
      models.idea
        .getAll()
        .then((response) => {
          let ideas = response.docs.map(docModifier);

          let usersIdeas = [];

          ideas.forEach((idea) => {
            if (idea.creator === localStorage.getItem("userEmail")) {
              usersIdeas.push(idea);
            }
          });

          context.usersIdeas = usersIdeas;

          extend(context).then(function () {
            this.partial("../views/user/profilePage.hbs");
          });
        })
        .catch((e) => console.error(e));
    },
  },
  post: {
    login(context) {
      const { username, password } = context.params;

      models.user
        .login(username, password)
        .then((response) => {
          context.user = response;
          context.username = response.email;
          context.isLoggedIn = true;
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
    register(context) {
      const { username, password, repeatPassword } = context.params;

      if (username.length < 3) {
        alert("Username must be at least 3 characters!");
        context.redirect("#/user/register");
        return;
      }

      if (password.length < 3) {
        alert("Password must be at least 3 characters!");
        context.redirect("#/user/register");
        return;
      }

      if (password !== repeatPassword) {
        alert("Passwords are not same!");
        context.redirect("#/user/register");
        return;
      }

      models.user
        .register(username, password)
        .then((response) => {
          context.redirect("#/home");
        })
        .catch((e) => console.error(e));
    },
  },
};
