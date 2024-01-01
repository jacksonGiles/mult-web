<template>
  <div class="load-container">
    <img class="load" :src="require('../assets/multlogo2.png')" alt="" />
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  async mounted() {
    this.animate();
  },
  methods: {
    animate() {
      var tl = gsap.timeline();

      tl.from(".load", {
        duration: 2,
        opacity: 0,
        ease: "power2.out",
      });

      tl.to(".load-container", {
        duration: 1,
        opacity: 0,
        ease: "power2.out",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.load-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #a7cae4;
}
.load {
  height: 5vh;
}
</style>
