let db = firebase.firestore();

export default {
  create(post) {
    return db.collection("posts").add(post);
  },

  getAll() {
    return db.collection("posts").get();
  },

  details(postId) {
    return db.collection("posts").doc(postId).get();
  },

  delete(postId) {
    return db.collection("posts").doc(postId).delete();
  },

  update(postId, post) {
    return db.collection("posts").doc(postId).update(post);
  },
};
