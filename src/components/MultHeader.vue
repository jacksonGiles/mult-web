<template>
  <div>
    <div class="nav-header">
      <router-link to="/">
        <button class="logo-btn">
          <v-img
            class="logo-button"
            alt="Vue logo"
            src="../assets/multlogo2.png"
          />
        </button>
      </router-link>
      <button @click="expandPage()">
        <v-icon
          class="expand-icon"
          :class="expanded ? 'expanded' : 'not-expanded'"
          size="x-large"
          >mdi-plus</v-icon
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
  z-index: 1000;
  transition: transform 0.3s ease;
  filter: blur(0.75px);
  //   opacity: 95%;
}
.expanded {
  color: #b8ddfa;
  transform: rotate(-45deg);
}

.not-expanded {
  color: #111310;
  transform: rotate(0deg);
}
</style>
