import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import categorie from "./modules/categorie";
import layout from "./modules/layout";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    categorie,
    layout
  },
  // strict: process.env.NODE_ENV !== "production"
  strict: false
});
// store.dispatch(`auth/init`);
// store.dispatch(`restaurant/init`);

export default store;
