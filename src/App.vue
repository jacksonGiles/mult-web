<template>
  <div
    class="mult-page"
    :style="{
      'background-image':
        'url(' + require('./assets/smudgebackground.png') + ')',
      'background-size': '150%',
      'background-position': bgPosition,
    }"
    @mousemove="updateBgPosition"
  >
    <MultHeader />
    <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <MenuOverlay v-if="menuOpen" :show="menuOpen" class="menu-overlay" />
    </transition>
    <router-view />
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import MultHeader from "./components/MultHeader.vue";
import MenuOverlay from "./components/MenuOverlay.vue";
import { gsap } from "gsap";
export default {
  components: {
    MultHeader,
    MenuOverlay,
  },
  mounted() {
    this.$nextTick(() => {
      // Calculate initial position based on center of screen
      this.updateBgPosition({
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      });
    });
  },
  computed: {
    menuOpen() {
      return this.$store.state.menuOpen;
    },
  },
  data() {
    return {
      image: "./assets/smudgebackground.png",
      // expandMenu: false,
      bgPosition: "50% 50%",
    };
  },
  methods: {
    beforeEnter(el) {
      gsap.set(el, { opacity: 0 });
    },
    enter(el, done) {
      gsap.to(el, { opacity: 0.8, duration: 0.4, onComplete: done });
    },
    leave(el, done) {
      gsap.to(el, { opacity: 0, duration: 0.4, onComplete: done });
    },
    updateBgPosition(event) {
      // Adjust these values to get the desired effect
      let xPercent = (event.clientX / window.innerWidth - 0.5) * 3;
      let yPercent = (event.clientY / window.innerHeight - 0.5) * 3;

      this.bgPosition = `${50 + xPercent / 2}% ${50 + yPercent / 2}%`;
    },
  },
};
</script>

<style>
@import url("https://use.typekit.net/oxk2wlu.css");
/* colors
#B8DDFA // white
#257096 // black
#0C2E2E // green */
* {
  margin: 0;
}
#app {
  font-family: "degular", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mult-page {
  width: 100vw;
  height: 100vh;
}
.menu-overlay {
  position: absolute;
  top: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
\ nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
