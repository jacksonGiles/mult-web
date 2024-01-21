<template>
  <div class="listen-page">
    <div
      :class="
        $vuetify.display.mdAndDown
          ? 'song-vis-container-mobile'
          : 'song-vis-container'
      "
    >
      <div
        :class="$vuetify.display.mdAndDown ? 'song-list-mobile' : 'song-list'"
      >
        <div v-for="(song, index) in songList" :key="index">
          <button
            class="song-btn"
            :style="$vuetify.display.mdAndDown ? 'width: 80vw;' : ''"
            @click="setSrc(song)"
            :disabled="loading"
            color="#E8E8E8"
            dark
          >
            {{ song.title }}
          </button>
        </div>
      </div>
      <LoadCube
        v-if="!songSelected"
        :style="
          $vuetify.display.mdAndDown
            ? 'width: 80vw; height: 40vh; position: relative;'
            : 'width: 20vw;'
        "
      />
      <AudioVisualizer
        v-if="songSelected"
        :class="$vuetify.display.mdAndDown ? 'mobile-vis' : 'desktop-vis'"
        :style="
          $vuetify.display.mdAndDown
            ? 'width: 80vw; height: 40vh; position: relative;'
            : 'width: 20vw;'
        "
        :key="visualizerKey"
        :songSrc="songSrc"
        :songColor="color"
        @doneLoading="loading = false"
        @songFinished="songSelected = false"
      />
      <div
        v-if="songSelected && loading"
        :class="$vuetify.display.mdAndDown ? 'loading-mobile' : 'loading'"
      >
        <v-progress-linear indeterminate color="#e8e8e8"></v-progress-linear>
      </div>
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
          src: require("../assets/songs/ben song with vox.wav"),
          color: 0x443371,
        },
      ],
      songSrc: "",
      color: 0,
      songSelected: false,
      visualizerKey: 0,
      loading: false,
    };
  },
  methods: {
    setSrc(song) {
      this.songSrc = song.src;
      this.color = song.color;
      this.songSelected = true;
      this.loading = true;
      this.visualizerKey++; // Increment the key
      console.log(this.songSrc);
      // console.log(this.color);
    },
  },
};
</script>

<style lang="scss" scoped>
.listen-page {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 80vh;
  width: 100vw;
}
.song-list {
  display: grid;
  width: 20vw;
}
.song-list-mobile {
  display: grid;
  height: 20vh;
  align-content: center;
  // margin: 5vh 0;
}
.song-vis-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(26, 28, 26, 0.5);
  width: 40vw;
  height: 50vh;
}
.song-vis-container-mobile {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  background: rgba(26, 28, 26, 0.5);
  width: 80vw;
  height: 60vh;
}
.mobile-vis {
  // height: 40vh;
}
.desktop-vis {
  // width: 20vw;
}
.loading {
  height: 50vh;
  width: 20vw;
  background-color: black;
  position: absolute;
  z-index: 1000000;
  left: 50%;
}
.loading-mobile {
  height: 40vh;
  width: 80vw;
  background-color: black;
  // background-color: blue;

  position: absolute;
  z-index: 1000000;
  // top: 50%; // Positions the top of the element at the middle of the parent
  top: 37.4%;
  left: 49.9%; // Positions the left of the element at the middle of the parent
  transform: translate(-50%, -50%);
}
.song-btn {
  color: #e8e8e8;
  // filter: blur(0.4px);
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
