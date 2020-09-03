export default function (context) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      context.isLoggedIn = true;
      context.userId = user.uid;
      context.username = user.email;
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("userEmail", user.email);
    } else {
      context.isLoggedIn = false;
      context.userId = null;
      context.username = null;
      localStorage.clear();
    }
  });

  return context.loadPartials({
    header: "../views/common/header.hbs",
    footer: "../views/common/footer.hbs",
  });
}
