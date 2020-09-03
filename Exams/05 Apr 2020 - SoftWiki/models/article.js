let db = firebase.firestore();

export default {
  create(article) {
    return db.collection("articles").add(article);
  },

  getAll() {
    return db.collection("articles").get();
  },

  details(articleId) {
    return db.collection("articles").doc(articleId).get();
  },

  delete(articleId) {
    return db.collection("articles").doc(articleId).delete();
  },

  update(articleId, article) {
    return db.collection("articles").doc(articleId).update(article);
  },
};
