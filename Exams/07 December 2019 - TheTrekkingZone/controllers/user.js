import extend from "../utils/context.js";
import models from "../models/index.js";
import docModifier from "../utils/docModifier.js";

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

    profilePage(context) {
      models.trek.getAll().then((response) => {
        let treks = response.docs.map(docModifier);

        let userTreks = [];

        treks.forEach((trek) => {
          if (trek.organizer === localStorage.getItem("userEmail")) {
            userTreks.push(trek);
          }
        });

        context.userTreks = userTreks;

        extend(context).then(function () {
          this.partial("../views/user/profilePage.hbs");
        });
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
      const { username, password, rePassword } = context.params;

      if (username.length < 3) {
        alert("Username must be at least 3 characters!");
        context.redirect("#/user/register");
        return;
      }

      if (password !== rePassword) {
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
