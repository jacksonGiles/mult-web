<template>
  <div>
    <div class="nav-header">
      <router-link to="/">
        <button class="logo-btn">
          <v-img
            class="logo-button"
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
export default {
  props: ["listen"],
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
.expand-icon {
  font-size: 3em;
  z-index: 100000;
  transition: transform 0.3s ease;
  // transition: color 0.3s ease, opacity 0.3s ease;
  filter: blur(0.75px);
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
  color: #111310;
}

.listen-color {
  color: #e8e8e8;
}

.listen-color:hover {
  color: #e8e8e8;
  opacity: 0.6;
}
</style>
