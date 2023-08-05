<template>
  <div ref="menuRef" class="menu">
    <div class="menu-links">
      <router-link class="link" to="/" @click="closeMenu">MUSIC</router-link>
      <router-link class="link" to="/" @click="closeMenu">MERCH</router-link>
      <router-link class="link" to="/" @click="closeMenu">CONTACT</router-link>
      <router-link class="link" to="/about" @click="closeMenu"
        >ABOUT</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeMenu() {
      this.$store.dispatch("toggleMenu");
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
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
  filter: blur(0.75px);
  transition: color 0.3s ease, opacity 0.3s ease;
}
.link:hover {
  color: #358cb9;
  opacity: 0.8;
}
</style>
