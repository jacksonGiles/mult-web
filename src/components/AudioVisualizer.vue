<template>
  <div ref="visualizerContainer" class="visualizer"></div>
</template>

<script>
import * as THREE from "three";

export default {
  props: ["songSrc", "songColor"],
  mounted() {
    this.initThree();
    // this.initAudio();
  },
  data() {
    return {
      audioContext: null,
      analyser: null,
      fftData: null,
    };
  },

  methods: {
    initThree() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x070808);
      const camera = new THREE.PerspectiveCamera(
        60,
        this.$refs.visualizerContainer.offsetWidth /
          this.$refs.visualizerContainer.offsetHeight,
        0.1,
        5
      );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(
        this.$refs.visualizerContainer.offsetWidth,
        this.$refs.visualizerContainer.offsetHeight
      );
      this.$refs.visualizerContainer.appendChild(renderer.domElement);

      // const geometry = new THREE.BoxGeometry(1, 1, 1);

      const geometry = new THREE.BufferGeometry();
      const material = new THREE.MeshPhongMaterial({ color: this.songColor });
      const vis = new THREE.Mesh(geometry, material);
      scene.add(vis);

      const color = 0xe8e8e8;
      const intensity = 2;
      const light = new THREE.DirectionalLight(color, intensity);
      light.position.set(0, 1, 4);
      scene.add(light);

      camera.position.z = 5;

      // AUDIO ANALYSIS
      const audioContext = new AudioContext();
      let analyser;
      let fftData;

      const initAudio = async () => {
        const response = await fetch(this.songSrc);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        source.start();
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
      //

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

      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }

        return needResize;
      }

      const temp = new THREE.Vector3();

      function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }

        if (fftData && fftData.length > 0) {
          // Check if fftData is defined and has elements
          for (let i = 0; i < positions.length; i += 3) {
            const quad = (i / 12) | 0;
            const ringId = (quad / segmentsAround) | 0;
            const ringQuadId = quad % segmentsAround;
            const ringU = ringQuadId / segmentsAround;
            const angle = ringU * Math.PI * 2;
            temp.fromArray(normals, i);

            const fftValue = fftData[ringId % fftData.length];
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
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
      }

      initAudio();
      requestAnimationFrame(render);

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
      // if (resizeRendererToDisplaySize(renderer)) {
      //   const canvas = renderer.domElement;
      //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
      //   camera.updateProjectionMatrix();
      // }
      window.addEventListener("resize", onWindowResize);
    },
  },
};
</script>

<style lang="scss" scoped>
.visualizer {
  width: 100%;
  height: 50vh;
}
</style>
