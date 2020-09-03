import extend from "../utils/context.js";
import models from "../models/index.js";

export default {
  get: {
    login(context) {
      extend(context).then(function () {
        this.partial("../views/user/login.hbs");
      });
    },

    register(context) {
      extend(context).then(function () {
        this.partial("../views/user/register.hbs");
      });
    },

    logout(context) {
      models.user.logout().then((response) => {
        context.redirect("#/home");
      });
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
      const { username, password, repeatPassword} = context.params;

      if (username.length < 6) {
        alert("Username must be at least 3 characters!");
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
