<template>
  <div
    :class="listen ? 'listen mult-page' : 'mult-page'"
    :style="getBackgroundStyle"
    @mousemove="updateBgPosition"
  >
    <MultHeader :listen="listen" />
    <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <MenuOverlay
        v-if="menuOpen"
        :show="menuOpen"
        :listen="listen"
        class="menu-overlay"
      />
    </transition>
    <router-view @listen="listenPage" />
  </div>
  <LoadIn
    v-if="!imagesLoaded"
    :listen="listen"
    class="load-in"
    style="
      z-index: 9999999;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  />
  <!-- <LoadIn v-if="!imagesLoaded" class="load-in" /> -->
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import MultHeader from "./components/MultHeader.vue";
import MenuOverlay from "./components/MenuOverlay.vue";
import LoadIn from "./components/LoadIn.vue";
import { gsap } from "gsap";
export default {
  components: {
    MultHeader,
    MenuOverlay,
    LoadIn,
  },
  async mounted() {
    this.$nextTick(() => {
      this.updateBgPosition({
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2,
      });
    });

    setTimeout(async () => {
      await this.imagePreload();
      if (this.imagesLoaded) {
        gsap.from(".mult-page", {
          duration: 2,
          opacity: 0,
          ease: "power2.out",
        });
      }
    }, 1000);
  },
  computed: {
    menuOpen() {
      return this.$store.state.menuOpen;
    },
    getBackgroundStyle() {
      let backgroundSize, backgroundPosition;

      if (this.listen) {
        backgroundSize = this.$vuetify.display.smAndDown ? "180%" : "100%";
        backgroundPosition = this.$vuetify.display.smAndDown
          ? this.mobileAltPosition
          : this.bgAltPosition;
      } else {
        backgroundSize = this.$vuetify.display.smAndDown
          ? "200%"
          : this.$vuetify.display.mdAndDown
          ? "108%"
          : "100%";
        backgroundPosition = this.$vuetify.display.smAndDown
          ? this.mobilePosition
          : this.bgPosition;
      }

      return {
        "background-image": `url(${
          this.listen ? this.smudgeAlt : this.smudge
        })`,
        "background-size": backgroundSize,
        "background-position": backgroundPosition,
      };
    },
  },
  data() {
    return {
      image: "./assets/smudgebackground.png",
      // expandMenu: false,
      bgPosition: "50% 100%",
      mobilePosition: "70% 100%",

      bgAltPosition: "50% 50%",
      mobileAltPosition: "70% 100%",
      listen: false,

      imagesLoaded: false,
      smudgeAlt: null,
      smudge: null,
    };
  },
  methods: {
    beforeEnter(el) {
      gsap.set(el, { opacity: 0 });
    },
    enter(el, done) {
      gsap.to(el, { opacity: 0.8, duration: 0.4, onComplete: done });
    },
    enterView(el, done) {
      gsap.to(el, { opacity: 1, duration: 0.4, onComplete: done });
    },
    imagePreload() {
      const images = [
        require("./assets/SMUDGE4.png"),
        require("./assets/smudgebackground.png"),
      ];
      const promises = images.map((imageSrc, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            this[index === 0 ? "smudgeAlt" : "smudge"] = imageSrc;
            resolve();
          };
          img.src = imageSrc;
        });
      });
      setTimeout(() => {
        this.imagesLoaded = true;
      }, 3000);
      return Promise.all(promises);
    },
    leave(el, done) {
      gsap.to(el, { opacity: 0, duration: 0.4, onComplete: done });
    },
    listenPage(listen) {
      this.listen = listen;
    },
    updateBgPosition(event) {
      let xPercent = (event.clientX / window.innerWidth - 0.5) * 3;
      let yPercent = (event.clientY / window.innerHeight - 0.5) * 3;

      this.bgPosition = `${50 + xPercent / 2}% ${50 + yPercent / 2}%`;
      this.bgAltPosition = `${50 + xPercent / 2}% ${50 + yPercent / 2}%`;
    },
  },
};
</script>

<style>
@import url("https://use.typekit.net/oxk2wlu.css");

/* colors
#B8DDFA // white
#257096 // blue
#0C2E2E // green
#181C1C // black */
* {
  margin: 0;
}
#app {
  font-family: "degular", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b8ddfa;
}
.load-in {
  position: absolute;
}
.mult-page {
  width: 100vw;
  height: 100vh;
}
.listen {
  background-color: #181c1c;
}
.menu-overlay {
  position: absolute;
  top: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
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
