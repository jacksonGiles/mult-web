import { createStore } from "vuex";

export default createStore({
  state: {
    menuOpen: false,
    isTransitioning: false,
  },
  mutations: {
    setMenuOpen(state, value) {
      state.menuOpen = value;
    },
    setIsTransitioning(state, value) {
      state.isTransitioning = value;
    },
  },
  actions: {
    toggleMenu({ commit, state }) {
      commit("setMenuOpen", !state.menuOpen);
    },
    startTransition({ commit }) {
      commit("setIsTransitioning", true);
    },
    endTransition({ commit }) {
      commit("setIsTransitioning", false);
    },
  },
  modules: {},
});
