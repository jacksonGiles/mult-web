<template>
  <canvas ref="visualizerContainer" class="visualizer" v-once></canvas>
</template>

<script type="module">
import * as THREE from "three";
import { mapState, mapActions } from "vuex";
export default {
  props: ["songSrc", "songColor", "visualizerKey"],
  components: {},
  mounted() {
    this.initThree();
    const audioContext = new AudioContext({
      sampleRate: 44100,
      latencyHint: "playback",
      sampleSize: 1024,
    });
    this.audioContext = audioContext;
  },
  data() {
    return {
      audioContext: null,
      analyser: null,
      fftData: null,
      renderer: null,
      geometry: null,
      material: null,
      camera: null,
      source: null,
      startTime: 0,
      durationLocal: 0,
      currentLocal: 0,
    };
  },
  computed: {
    ...mapState(["currentTime", "duration", "play"]),
  },
  methods: {
    ...mapActions([
      "setDuration",
      "setCurrentTime",
      "togglePlay",
      "setCurrent",
    ]),
    initThree() {
      const canvas = this.$refs.visualizerContainer;
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas,
      });

      this.camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        5
      );

      const renderer = this.renderer;
      const camera = this.camera;

      const scene = new THREE.Scene();
      // scene.background = new THREE.Color(0x070808);

      const color = 0xe8e8e8;
      const intensity = 2;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 1, 4);
      scene.add(light);

      function makeSpherePositions(segmentsAround, segmentsDown) {
        const numVertices = segmentsAround * segmentsDown * 6;
        const numComponents = 3;
        const positions = new Float32Array(numVertices * numComponents);
        const indices = [];

        const longHelper = new THREE.Object3D();
        const latHelper = new THREE.Object3D();
        const pointHelper = new THREE.Object3D();
        longHelper.add(latHelper);
        latHelper.add(pointHelper);
        pointHelper.position.z = 1;
        const temp = new THREE.Vector3();

        function getPoint(lat, long) {
          latHelper.rotation.x = lat;
          longHelper.rotation.y = long;
          longHelper.updateMatrixWorld(true);
          return pointHelper.getWorldPosition(temp).toArray();
        }

        let posNdx = 0;
        let ndx = 0;
        for (let down = 0; down < segmentsDown; ++down) {
          const v0 = down / segmentsDown;
          const v1 = (down + 1) / segmentsDown;
          const lat0 = (v0 - 0.5) * Math.PI;
          const lat1 = (v1 - 0.5) * Math.PI;

          for (let across = 0; across < segmentsAround; ++across) {
            const u0 = across / segmentsAround;
            const u1 = (across + 8) / segmentsAround;
            const long0 = u0 * Math.PI * 9;
            const long1 = u1 * Math.PI * 9;

            positions.set(getPoint(lat0, long0), posNdx);
            posNdx += numComponents;
            positions.set(getPoint(lat1, long0), posNdx);
            posNdx += numComponents;
            positions.set(getPoint(lat0, long1), posNdx);
            posNdx += numComponents;
            positions.set(getPoint(lat1, long1), posNdx);
            posNdx += numComponents;

            indices.push(ndx, ndx + 1, ndx + 2, ndx + 2, ndx + 1, ndx + 3);
            ndx += 4;
          }
        }

        return { positions, indices };
      }

      const segmentsAround = 24;
      const segmentsDown = 16;
      const { positions, indices } = makeSpherePositions(
        segmentsAround,
        segmentsDown
      );

      const normals = positions.slice();

      const geometry = new THREE.BufferGeometry();
      const material = new THREE.MeshPhongMaterial({ color: this.songColor });
      this.geometry = geometry;
      this.material = material;

      const vis = new THREE.Mesh(geometry, material);
      scene.add(vis);

      camera.position.z = 5;

      const positionNumComponents = 3;
      const normalNumComponents = 3;

      const positionAttribute = new THREE.BufferAttribute(
        positions,
        positionNumComponents
      );
      positionAttribute.setUsage(THREE.DynamicDrawUsage);
      geometry.setAttribute("position", positionAttribute);
      geometry.setAttribute(
        "normal",
        new THREE.BufferAttribute(normals, normalNumComponents)
      );
      geometry.setIndex(indices);

      // AUDIO ANALYSIS
      // const audioContext = new AudioContext({
      //   sampleRate: 44100,
      // });
      // this.audioContext = audioContext;
      let analyser;
      let fftData;

      const initAudio = async () => {
        const response = await fetch(this.songSrc);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await this.audioContext.decodeAudioData(
          arrayBuffer
        );
        const source = this.audioContext.createBufferSource();
        this.source = source;
        source.buffer = audioBuffer;

        const time = audioBuffer.duration;
        this.durationLocal = time;

        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;

        var ret = "";
        if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + String(mins) + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        this.$store.dispatch("setDuration", `${ret}`);

        analyser = this.audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(this.audioContext.destination);

        source.onended = () => {
          this.$emit("songFinished");
          this.$store.dispatch("setDuration", 0);
        };

        this.$store.dispatch("togglePlay");
        source.start(0);
        extractFFTData();
      };

      const extractFFTData = () => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateFFTData = () => {
          analyser.getByteFrequencyData(dataArray);
          fftData = dataArray;
          requestAnimationFrame(updateFFTData);
        };

        updateFFTData();
      };

      const temp = new THREE.Vector3();

      // const startTime = 0;

      const render = (time) => {
        if (fftData && fftData.length > 0) {
          time *= 0.001;

          if (this.play) {
            const currentTime = this.audioContext.currentTime;
            this.currentLocal = currentTime;

            var hrs = ~~(currentTime / 3600);
            var mins = ~~((currentTime % 3600) / 60);
            var secs = ~~currentTime % 60;

            var ret = "";
            if (hrs > 0) {
              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }
            ret += "" + String(mins) + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            this.$store.dispatch("setCurrentTime", `${ret}`);
            this.$store.dispatch("setProgress", {
              current: currentTime,
              total: this.durationLocal,
            });
          }

          this.$emit("doneLoading");

          if (this.resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          }
          for (let i = 0; i < positions.length; i += 3) {
            const quad = (i / 12) | 0;
            const ringId = (quad / segmentsAround) | 0;
            const ringQuadId = quad % segmentsAround;
            const ringU = ringQuadId / segmentsAround;
            const angle = ringU * Math.PI * 2;
            temp.fromArray(normals, i);

            const fftValue = fftData[ringId % fftData.length];
            if (fftValue > 255) {
              console.log(fftValue);
            }
            const scale = THREE.MathUtils.mapLinear(fftValue, 0, 255, 1, 2);

            temp.multiplyScalar(
              THREE.MathUtils.lerp(
                1,
                scale,
                Math.sin(time + ringId + angle) * 0.5 + 0.5
              )
            );
            temp.toArray(positions, i);
          }

          positionAttribute.needsUpdate = true;

          renderer.render(scene, camera);
          if (!this.play && this.currentLocal > 0) {
            this.audioContext.suspend();
          } else if (this.play && this.currentLocal > 0) {
            this.audioContext.resume();
          }
        }
        requestAnimationFrame(render);
      };

      initAudio();
      requestAnimationFrame(render);

      this.onWindowResize();

      window.addEventListener("resize", this.onWindowResize, false);
    },
    resizeRendererToDisplaySize() {
      const canvas = this.renderer.domElement;
      const pixelRatio = window.devicePixelRatio;
      const width = (canvas.clientWidth * pixelRatio) | 0;
      const height = (canvas.clientHeight * pixelRatio) | 0;
      const needResize =
        this.renderer.width !== width || this.renderer.height !== height;
      if (needResize) {
        this.renderer.setSize(width, height, false);
      }
      return needResize;
    },

    onWindowResize() {
      const canvas = this.$refs.visualizerContainer;

      const pixelRatio = window.devicePixelRatio;
      const width = (canvas.clientWidth * pixelRatio) | 0;
      const height = (canvas.clientHeight * pixelRatio) | 0;

      this.renderer.setSize(width, height, false);

      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    },
    disposeThree() {
      this.renderer.dispose();
      this.geometry.dispose();
      this.material.dispose();
      this.source.stop(0);
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
    this.disposeThree();
    this.$store.dispatch("togglePlay");
  },
};
</script>

<style lang="scss" scoped>
.visualizer {
  width: 100%;
  height: 100%;
}
</style>
