<template>
  <div class="listen-page">
    <div class="song-vis-container">
      <div class="song-list">
        <div v-for="(song, index) in songList" :key="index">
          <button class="song-btn" @click="setSrc(song)" color="#E8E8E8" dark>
            {{ song.title }}
          </button>
        </div>
      </div>
      <!-- <transition name="fade" apppear> </transition> -->
      <LoadCube v-if="!songSelected" />
      <AudioVisualizer
        v-if="songSelected"
        :key="visualizerKey"
        :songSrc="songSrc"
        :songColor="color"
      />
    </div>
  </div>
</template>

<script>
import AudioVisualizer from "../components/AudioVisualizer.vue";
import LoadCube from "../components/LoadCube.vue";
export default {
  components: {
    AudioVisualizer,
    LoadCube,
  },
  mounted() {
    this.$emit("listen", true);
  },
  data() {
    return {
      // grab from database later
      songList: [
        {
          title: "CARDINAL",
          src: require("../assets/songs/CARDINAL-rough.wav"),
          color: 0x901215,
        },
        {
          title: "BLACKOUT",
          src: require("../assets/songs/BLACKOUT rough.wav"),
          color: 0xa2994b,
        },
        {
          title: "SILHOUETTES",
          src: require("../assets/songs/SILHOUETTE rough.wav"),
          color: 0x25367f,
        },
        {
          title: "ASHEN",
          src: require("../assets/songs/ASHEN rough.wav"),
          color: 0x16537e,
        },
        {
          title: "BACK AROUND",
          src: require("../assets/songs/ben song rough.wav"),
          color: 0x443371,
        },
      ],
      songSrc: "",
      color: 0,
      songSelected: false,
      visualizerKey: 0,
    };
  },
  methods: {
    setSrc(song) {
      this.songSrc = song.src;
      this.color = song.color;
      this.songSelected = true;
      this.visualizerKey++; // Increment the key
      console.log(this.songSrc);
      console.log(this.color);
    },
  },
};
</script>

<style lang="scss" scoped>
.listen-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100vw;
}
.song-list {
  display: grid;
}
.song-vis-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(26, 28, 26, 0.5);
  width: 40vw;
}
.song-btn {
  color: #e8e8e8;
  filter: blur(0.4px);
  transition: color 0.3s ease, opacity 0.3s ease;
  width: 20vw;
}
.song-btn:hover {
  color: #181c1c;
  background-color: #e8e8e8;
  opacity: 0.8;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s; /* Adjust the duration as needed */
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
