let db = firebase.firestore();

export default {
  create(offer) {
    return db.collection("offers").add(offer);
  },

  getAll() {
    return db.collection("offers").get();
  },

  details(offerId) {
    return db.collection("offers").doc(offerId).get();
  },

  delete(offerId) {
    return db.collection("offers").doc(offerId).delete();
  },

  update(offerId, offer) {
    return db.collection("offers").doc(offerId).update(offer);
  },
};
