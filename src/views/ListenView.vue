<template>
  <LoginPage
    v-if="!loggedIn"
    class="login"
    @login="login"
    :isError="isError"
    :errorMessage="errorMessage"
  />
  <div v-if="loggedIn" class="listen-page">
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
            : 'width: 25vw;'
        "
      />
      <AudioVisualizer
        v-if="songSelected"
        :class="$vuetify.display.mdAndDown ? 'mobile-vis' : 'desktop-vis'"
        :style="
          $vuetify.display.mdAndDown
            ? 'width: 80vw; height: 40vh; position: relative;'
            : 'width: 25vw;'
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
    <!-- v-if="songSelected" -->
    <PlayBar
      v-if="songSelected"
      class="play-bar-component"
      :style="$vuetify.display.mdAndDown ? 'top: 87%' : ''"
    />
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { mapActions } from "vuex";
import AudioVisualizer from "../components/AudioVisualizer.vue";
import LoadCube from "../components/LoadCube.vue";
import LoginPage from "../components/LoginPage.vue";
import PlayBar from "../components/PlayBar.vue";
export default {
  components: {
    AudioVisualizer,
    LoadCube,
    LoginPage,
    PlayBar,
  },
  mounted() {
    this.$emit("listen", true);
  },
  data() {
    return {
      songList: [
        {
          title: "BLACKOUT",
          src: require("../assets/songs/01 BLACKOUT.wav"),
          color: 0xa2994b,
        },
        {
          title: "SILHOUETTES",
          src: require("../assets/songs/02 SILHOUETTES.wav"),
          color: 0x25367f,
        },
        {
          title: "ASHEN",
          src: require("../assets/songs/03 ASHEN.wav"),
          color: 0x16537e,
        },
        {
          title: "CARDINAL",
          src: require("../assets/songs/04 CARDINAL.wav"),
          color: 0xc92f2f,
        },
        {
          title: "BACK AROUND",
          src: require("../assets/songs/05 BACK AROUND.wav"),
          color: 0x81993e,
        },
      ],
      songSrc: "",
      color: 0,
      songSelected: false,
      visualizerKey: 0,
      loading: false,

      loggedIn: false,
      isError: false,
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(["setTitle", "togglePlay", "setCurrentTime", "setCurrent"]),
    setSrc(song) {
      this.$store.dispatch("setTitle", song.title); // Set the title in the Vuex store
      this.songSrc = song.src;
      this.color = song.color;
      this.songSelected = true;
      this.loading = true;
      this.visualizerKey += 1;
    },
    login(password) {
      const email = "generic_user@generic.com";
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          user.getIdToken().then((token) => {
            localStorage.setItem("userToken", token);
            this.loggedIn = true;
          });
        })
        .catch((error) => {
          this.isError = true;
          if (error.code === "auth/invalid-credential") {
            this.errorMessage = "Incorrect password";
          } else {
            this.errorMessage = "There was an error. Try again later.";
          }
        });
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
  width: 25vw;
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
  width: 50vw;
  height: 60vh;
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
  height: 60vh;
  width: 25vw;
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
  width: 25vw;
}
.song-btn:hover {
  color: #181c1c;
  background-color: #e8e8e8;
  opacity: 0.8;
}
.login {
  position: absolute;
  z-index: 100000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.play-bar-component {
  position: absolute;
  top: 95%;
}
</style>
