let db = firebase.firestore();

export default {
  create(idea) {
    return db.collection("ideas").add(idea);
  },

  getAll() {
    return db.collection("ideas").get();
  },

  details(ideaId) {
    return db.collection("ideas").doc(ideaId).get();
  },

  delete(ideaId) {
    return db.collection("ideas").doc(ideaId).delete();
  },

  update(ideaId, idea) {
    return db.collection("ideas").doc(ideaId).update(idea);
  },
};
