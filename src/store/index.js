import { createStore } from "vuex";

export default createStore({
  state: {
    menuOpen: false,
    isTransitioning: false,
    currentTime: "0:00",
    duration: "0:00",
    play: false,
    title: "---",
    current: 0,
    total: 0,
    progress: 0,
  },
  mutations: {
    setMenuOpen(state, value) {
      state.menuOpen = value;
    },
    setIsTransitioning(state, value) {
      state.isTransitioning = value;
    },
    setCurrentTime(state, currentTime) {
      state.currentTime = currentTime;
    },
    setDuration(state, duration) {
      state.duration = duration;
    },
    togglePlay(state, value) {
      state.play = value;
    },
    setTitle(state, title) {
      state.title = title;
    },
    setProgress(state, { current, total }) {
      state.current = current;
      state.total = total;
    },
    setCurrent(state, current) {
      state.current = current;
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
    setCurrentTime({ commit }, currentTime) {
      commit("setCurrentTime", currentTime);
    },
    setDuration({ commit }, duration) {
      commit("setDuration", duration);
    },
    togglePlay({ commit, state }) {
      commit("togglePlay", !state.play);
    },
    setTitle({ commit }, title) {
      commit("setTitle", title);
    },
    setCurrent({ commit }, current) {
      commit("setCurrent", current);
    },
    setProgress({ commit }, { current, total }) {
      commit("setProgress", { current, total });
    },
  },
  modules: {},
});
