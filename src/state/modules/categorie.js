import { auth, firestore, storage, messaging } from "@/firebase/firebase";
import firebase from "firebase/app";
import Vue from "vue";

const state = {
  lastMenu: null
};

const mutations = {
  INIT(state, payload) {
    state.currentLivreur = payload;
    state.orders = [];
  }
};
const actions = {
  init({ commit, dispatch, rootState }) {},
  add({ commit }, category) {
    return firestore
      .collection("category")
      .add(category)
      .then(result => {
        console.log("Une nouvelle categorie a été ajouté. ", result);
        return true;
      })
      .catch(err => {
        console.log(
          "Une erreur est survenue lors de l'ajout d'une categorie: ",
          err
        );
        return false;
      });
  }
};

const getters = {
  currentOrderData: (state, getters) => {
    return [];
  }
};

export default { state, actions, mutations, getters, namespaced: true };
