<template>
  <div
    class="play-bar"
    :style="$vuetify.display.mdAndDown ? 'width: 80vw;' : ''"
  >
    <div class="controls">
      <div class="play-button" @click="togglePlay">
        <v-icon color="#e8e8e8">{{ play ? "mdi-pause" : "mdi-play" }}</v-icon>
      </div>
      <h4 style="color: #e8e8e8; width: 33%">{{ title }}</h4>
      <div class="time">{{ currentTime }} / {{ duration }}</div>
    </div>
    <v-progress-linear
      color="#e8e8e8"
      :model-value="progress"
    ></v-progress-linear>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      // currentTime: 0,
      // duration: 0,
      // play: false,
      // title: "SONG TITLE",
    };
  },
  computed: {
    ...mapState([
      "currentTime",
      "duration",
      "current",
      "total",
      "play",
      "title",
    ]),
    progress() {
      return (this.current / this.total) * 100;
    },
  },
  methods: {
    ...mapActions(["togglePlay"]),
  },
};
</script>

<style lang="scss" scoped>
.play-bar {
  height: 8%;
  width: 25%;
  display: grid;
  align-items: end;
  background-color: #000000;
  padding: 0;
  margin: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // width: 33%;
}
.play-button {
  padding-left: 8px;
  display: flex;
  justify-content: flex-start;
  width: 33%;
}
.time {
  padding-right: 12px;
  color: white;
  display: flex;
  width: 33%;
  justify-content: flex-end;
}
</style>
