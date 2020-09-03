let db = firebase.firestore();

export default {
  create(cause) {
    return db.collection("causes").add(cause);
  },

  getAll() {
    return db.collection("causes").get();
  },

  details(causeId) {
    return db.collection("causes").doc(causeId).get();
  },

  delete(causeId) {
    return db.collection("causes").doc(causeId).delete();
  },

  update(causeId, cause) {
    return db.collection("causes").doc(causeId).update(cause);
  },
};
