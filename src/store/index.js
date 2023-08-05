import { createStore } from "vuex";

export default createStore({
  state: {
    menuOpen: false,
  },
  getters: {},
  mutations: {
    setMenuOpen(state, value) {
      state.menuOpen = value;
    },
  },
  actions: {
    toggleMenu({ commit, state }) {
      commit("setMenuOpen", !state.menuOpen);
    },
  },
  modules: {},
});
