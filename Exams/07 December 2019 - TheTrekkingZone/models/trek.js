let db = firebase.firestore();

export default {
  create(trek) {
    return db.collection("treks").add(trek);
  },

  getAll() {
    return db.collection("treks").get();
  },

  details(trekId) {
    return db.collection("treks").doc(trekId).get();
  },

  delete(trekId) {
    return db.collection("treks").doc(trekId).delete();
  },

  update(trekId, trek) {
    return db.collection("treks").doc(trekId).update(trek);
  },
};
