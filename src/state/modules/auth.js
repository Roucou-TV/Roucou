const state = {
  currentUser: sessionStorage.getItem("authUser")
};

const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveState("auth.currentUser", newValue);
  }
};

const getters = {
  loggedIn(state) {
    return !!state.currentUser;
  }
};

const actions = {
  init({ state, dispatch }) {
    dispatch("validate");
  },

  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null);
    const user = getFirebaseBackend().getAuthenticatedUser();
    commit("SET_CURRENT_USER", user);
    return user;
  }
};

export default { state, actions, mutations, getters, namespaced: true };
