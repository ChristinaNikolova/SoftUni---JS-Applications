let db = firebase.firestore();

export default {
  create(recipe) {
    return db.collection("recipes").add(recipe);
  },

  getAll() {
    return db.collection("recipes").get();
  },

  details(recipeId) {
    return db.collection("recipes").doc(recipeId).get();
  },

  delete(recipeId) {
    return db.collection("recipes").doc(recipeId).delete();
  },

  update(recipeId, recipe) {
    return db.collection("recipes").doc(recipeId).update(recipe);
  },
};
