<template>
  <div>
    <div class="nav-header">
      <router-link
        to="/"
        :style="$vuetify.display.smAndDown ? 'margin-top: 0.5vh' : ''"
      >
        <button class="logo-btn">
          <v-img
            :class="
              $vuetify.display.xs
                ? 'logo-button-mobile'
                : $vuetify.display.mdAndDown
                ? 'logo-button-tablet'
                : 'logo-button'
            "
            alt="Vue logo"
            :src="
              listen
                ? require('../assets/multlogo-invert1.png')
                : require('../assets/multlogo2.png')
            "
          />
        </button>
      </router-link>
      <button @click="expandPage()">
        <v-icon
          class="expand-icon"
          :class="
            listen
              ? expanded
                ? 'expanded listen-color'
                : 'not-expanded listen-color'
              : expanded
              ? 'expanded'
              : 'not-expanded not-expanded-color'
          "
          s
          >mdi-plus</v-icon
        >
      </button>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  props: ["listen"],
  mounted() {
    gsap.from([".logo-btn", ".expand-icon"], {
      duration: 2,
      opacity: 0,
      // y: -50,
      ease: "power2.out", // easing function
    });
  },
  data() {
    return {
      image: "./assets/smudgebackground.png",
    };
  },
  computed: {
    expanded() {
      return this.$store.state.menuOpen;
    },
  },
  methods: {
    expandPage() {
      this.$store.dispatch("toggleMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1em;
}
.logo-btn {
  padding: 0;
  background-color: transparent;
  border: none;
}
.logo-button {
  width: 12vw;
}
.logo-button-mobile {
  width: 40vw;
}
.logo-button-tablet {
  width: 20vw;
}
.expand-icon {
  font-size: 3em;
  z-index: 100000;
  transition: transform 0.3s ease;
  // transition: color 0.3s ease, opacity 0.3s ease;
  // filter: blur(0.6px);
  transform: translate3d(0, 0, 0);
  //   opacity: 95%;
}
.expanded {
  color: #b8ddfa;
  transform: rotate(-45deg);
}

.not-expanded {
  transform: rotate(0deg);
}
.not-expanded-color {
  color: #00201f;
}

.listen-color {
  color: #e8e8e8;
}

.listen-color:hover {
  color: #e8e8e8;
  opacity: 0.6;
}
</style>
