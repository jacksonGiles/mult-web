<template>
  <div ref="visualizerContainer" class="visualizer"></div>
</template>

<script>
import * as THREE from "three";

export default {
  mounted() {
    this.initThree();
    this.$refs.visualizerContainer.addEventListener(
      "mousemove",
      this.onMouseMove
    );
  },
  data() {
    return {
      mouse: new THREE.Vector2(),
      target: new THREE.Vector3(),
      dimensions: {
        x: null,
        y: null,
        halfX: null,
        halfY: null,
      },
      cube: null,
    };
  },
  methods: {
    initThree() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x070808);
      const camera = new THREE.PerspectiveCamera(
        75,
        this.$refs.visualizerContainer.offsetWidth /
          this.$refs.visualizerContainer.offsetHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(
        this.$refs.visualizerContainer.offsetWidth,
        this.$refs.visualizerContainer.offsetHeight
      );
      this.$refs.visualizerContainer.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: 0xe8e8e8 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const color = 0xe8e8e8;
      const intensity = 3;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 1, 4);
      scene.add(light);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        // cube.rotation.x = this.mouse.x * 1;
        // cube.rotation.y = this.mouse.y * 1;
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();

      const onWindowResize = () => {
        camera.aspect =
          this.$refs.visualizerContainer.offsetWidth /
          this.$refs.visualizerContainer.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          this.$refs.visualizerContainer.offsetWidth,
          this.$refs.visualizerContainer.offsetHeight
        );
      };
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      window.addEventListener("resize", onWindowResize);
    },
    onMouseMove(event) {
      event.preventDefault();
      const bounds = this.$refs.visualizerContainer.getBoundingClientRect();

      // Update the mouse variable
      this.mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      this.mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    },
    // ..
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
    this.$refs.visualizerContainer.removeEventListener(
      "mousemove",
      this.onMouseMove
    );
    // Here you should also dispose of materials, geometries, and any other disposable Three.js entities to prevent memory leaks
  },
};
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = (canvas.clientWidth * pixelRatio) | 0;
  const height = (canvas.clientHeight * pixelRatio) | 0;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
</script>

<style lang="scss" scoped>
.visualizer {
  width: 100%;
  height: 50vh;
}
</style>
