<template>
  <div ref="menuRef" class="menu">
    <div class="menu-links">
      <router-link
        class="link"
        :class="listen ? 'listen-link' : ''"
        to="/music"
        @click="closeMenu"
        >MUSIC</router-link
      >
      <router-link
        class="link"
        :class="listen ? 'listen-link' : ''"
        to="/merch"
        @click="closeMenu"
        >MERCH</router-link
      >
      <router-link
        class="link"
        :class="listen ? 'listen-link' : ''"
        to="/contact"
        @click="closeMenu"
        >CONTACT</router-link
      >
      <router-link
        class="link"
        :class="listen ? 'listen-link' : ''"
        to="/about"
        @click="closeMenu"
        >ABOUT</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["listen"],
  methods: {
    closeMenu() {
      this.$store.dispatch("toggleMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  z-index: 10000;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #171817;
  opacity: 80%;
  height: 100vh;
  width: 100vw;
}
.menu-links {
  display: block;
}
.link {
  display: block;
  color: #b8ddfa;
  text-decoration: none;
  font-weight: bold;
  font-size: 3em;
  filter: blur(0.6px);
  transition: color 0.3s ease, opacity 0.3s ease;
}
.listen-link {
  color: #e8e8e8;
}
.link:hover {
  color: #358cb9;
  opacity: 0.8;
}
.listen-link:hover {
  color: #e8e8e8;
  opacity: 0.6;
}
</style>
