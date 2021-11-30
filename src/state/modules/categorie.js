import { auth, firestore, storage, messaging } from "@/firebase/firebase";
import firebase from "firebase/app";
import Vue from "vue";

const state = {
  lastMenu: null,
  initdone: false,
  optionsCategories: [
    { value: null, text: "Selectionner une categorie", id: "" }
  ],
  checkCat: { lastDocCat: null, documentLimit: 2, hasMore: true },
  checkColor: { lastDocColor: null, documentLimit: 2, hasMore: true },
  checkChannel: { lastDocChannel: null, documentLimit: 2, hasMore: true },
  checkUser: { lastDocChannel: null, documentLimit: 2, hasMore: true },

  colors: [],
  channels: [],
  users: [],
  categorys: []
};

const mutations = {
  INIT(state, payload) {
    state.currentLivreur = payload;
    state.orders = [];
  },
  INIT_DONE(state, data) {
    state.initdone = data;
  },
  ADD_COLOR(state, data) {
    state.colors.unshift(data);
  },
  ADD_CATEGORY(state, data) {
    state.categorys.unshift(data);
  },
  ADD_COLOR(state, data) {
    state.colors.unshift(data);
  },
  ADD_CHANNEL(state, data) {
    state.channels.unshift(data);
  },
  ADD_USER(state, data) {
    state.users.unshift(data);
  },
  HAS_MORE_COLOR(state, e) {
    state.checkColor.hasMore = !!e;
  },
  HAS_MORE_USER(state, e) {
    state.checkUser.hasMore = !!e;
  },
  HAS_MORE_CHANNEL(state, e) {
    state.checkChannel.hasMore = !!e;
  },
  HAS_MORE_CAT(state, e) {
    state.checkCat.hasMore = !!e;
  },
  SET_LASTDOC_CHANNEL(state, data) {
    state.lastDocChannel = data;
  },
  SET_LASTDOC_CAT(state, data) {
    state.lastDocCat = data;
  },
  SET_LASTDOC_COLOR(state, data) {
    state.lastDocColor = data;
  },
  SET_LASTDOC_USER(state, data) {
    state.lastDocUser = data;
  },

  ADD_OPTION_CAT(state, category) {
    state.optionsCategories.unshift({
      value: category.nom,
      id: category.id,
      text: category.nom
    });
  },
  DELETE_OPTION_CAT(state, categoryId) {
    var index = state.optionsCategories.findIndex(ele => ele.id === categoryId);
    state.optionsCategories.splice(index, 1);
  }
};
const actions = {
  async init({ commit, dispatch, rootState, state }) {
    dispatch("listenCat");
    commit("INIT_DONE", true);
    if (state.users.length == 0) {
      await dispatch("getUsers");
    }
  },
  listenCat({ commit }, pay) {
    firestore.collection("categories").onSnapshot(
      snapshot => {
        if (!snapshot.empty) {
          snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
              commit("ADD_OPTION_CAT", {
                id: change.doc.id,
                ...change.doc.data()
              });
            }
            if (change.type === "modified") {
              commit("DELETE_OPTION_CAT", change.doc.id);
              commit("ADD_OPTION_CAT", {
                id: change.doc.id,
                ...change.doc.data()
              });
            }
            if (change.type === "removed") {
              commit("DELETE_OPTION_CAT", change.doc.id);
            }
          });
        } else {
          console.log("Pas de collection menus");
          commit("SET_EMPTY_MENUS");
        }
      },
      function(error) {
        console.log(error);
        commit("SET_ERROR", error);
      }
    );
  },
  addCategorie({ commit }, category) {
    return firestore
      .collection("categories")
      .add(category)
      .then(docref => {
        console.log("Une nouvelle categorie a été ajouté. ", docref);
        commit("ADD_CATEGORY", { ...category, id: docref.id });
        return true;
      })
      .catch(err => {
        console.log(
          "Une erreur est survenue lors de l'ajout d'une categorie: ",
          err
        );
        return false;
      });
  },
  addColor({ commit }, color) {
    return firestore
      .collection("couleurs")
      .add(color)
      .then(docref => {
        console.log("Une nouvelle color a été ajouté. avec l'ID ", docref.id);
        commit("ADD_COLOR", { ...color, id: docref.id });
        return true;
      })
      .catch(err => {
        console.log(
          "Une erreur est survenue lors de l'ajout d'une color: ",
          err
        );
        return false;
      });
  },
  addChannel({ commit }, channel) {
    return firestore
      .collection("chaines")
      .add(channel)
      .then(docref => {
        console.log("Une nouvelle chaine a été ajouté. ", docref);
        commit("ADD_CHANNEL", { ...channel, id: docref.id });
        return true;
      })
      .catch(err => {
        console.log(
          "Une erreur est survenue lors de l'ajout d'une chaine: ",
          err
        );
        return false;
      });
  },
  async getCategorie({ commit, state }, data) {
    var { documentLimit, hasMore, lastDocCat } = state.checkCat;
    var snap = null;
    if (hasMore) {
      if (lastDocCat == null) {
        snap = await firestore
          .collection("categories")
          .orderBy("nom")
          .limit(documentLimit)
          .get();
      } else {
        snap = await firestore
          .collection("categories")
          .orderBy("nom")
          .startAfter(lastDoc)
          .limit(documentLimit)
          .get();
      }
      commit("SET_LASTDOC_CAT", snap.docs[snap.docs.length - 1]);
      if (snap.docs.length < documentLimit) {
        commit("HAS_MORE_CAT", false);
      }
      for (var doc of snap.docs) {
        commit("ADD_CATEGORY", { id: doc["id"], ...doc.data() });
      }
    } else {
      console.log("Plus aucune categorie a afficher");
    }
  },
  async getChannel({ commit, dispatch }, last) {
    var { documentLimit, hasMore, lastDocChannel } = state.checkChannel;
    var snap = null;
    if (hasMore) {
      if (lastDocChannel == null) {
        snap = await firestore
          .collection("categories")
          .orderBy("nom")
          .limit(documentLimit)
          .get();
      } else {
        snap = await firestore
          .collection("categories")
          .orderBy("nom")
          .startAfter(lastDoc)
          .limit(documentLimit)
          .get();
      }
      commit("SET_LASTDOC_CHANNEL", snap.docs[snap.docs.length - 1]);
      if (snap.docs.length < documentLimit) {
        console.log("now there is no more channel");
        commit("HAS_MORE_CHANNEL", false);
      }
      for (var doc of snap.docs) {
        commit("ADD_CHANNEL", { id: doc["id"], ...doc.data() });
      }
    } else {
      console.log("Plus aucun channel à afficher");
    }
  },
  async getColor({ commit, dispatch }, last) {
    var { documentLimit, hasMore, lastDocColor } = state.checkColor;
    var snap = null;
    if (hasMore) {
      if (lastDocColor == null) {
        snap = await firestore
          .collection("couleurs")
          .orderBy("nom")
          .limit(documentLimit)
          .get();
      } else {
        snap = await firestore
          .collection("couleurs")
          .orderBy("nom")
          .startAfter(lastDoc)
          .limit(documentLimit)
          .get();
      }
      commit("SET_LASTDOC_COLOR", snap.docs[snap.docs.length - 1]);
      if (snap.docs.length < documentLimit) {
        console.log("now there is no more color");
        commit("HAS_MORE_COLOR", false);
      }
      for (var doc of snap.docs) {
        console.log(snap);
        commit("ADD_COLOR", { id: doc["id"], ...doc.data() });
      }
    } else {
      console.log("Plus aucun color a afficher");
    }
  },
  async getUsers({ commit, dispatch }, last) {
    var { documentLimit, hasMore, lastDocUsers } = state.checkColor;
    var snap = null;
    if (hasMore) {
      if (lastDocUsers == null) {
        snap = await firestore
          .collection("utilisateurs")
          .orderBy("nom")
          .limit(documentLimit)
          .get();
      } else {
        snap = await firestore
          .collection("utilisateurs")
          .orderBy("nom")
          .startAfter(lastDocUsers)
          .limit(documentLimit)
          .get();
      }
      commit("SET_LASTDOC_USER", snap.docs[snap.docs.length - 1]);
      if (snap.docs.length < documentLimit) {
        console.log("now there is no more user");
        commit("HAS_MORE_USER", false);
      }
      for (var doc of snap.docs) {
        console.log(snap);
        commit("ADD_USER", { id: doc["id"], ...doc.data() });
      }
    } else {
      console.log("Plus aucun utilistaeur à afficher");
    }
  }
};

const getters = {
  currentOrderData: (state, getters) => {
    return [];
  },
  getUsers: (state, getters) => {
    return state.users;
  },
  getColors: (state, getters) => {
    return state.colors;
  },
  getChannels: (state, getters) => {
    return state.channels;
  },
  getCategorys: (state, getters) => {
    return state.categorys;
  }
};

export default { state, actions, mutations, getters, namespaced: true };
