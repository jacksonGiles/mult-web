<template>
  <div>
    <div>
      <div class="music-container">
        <div
          class="music-item"
          :style="
            $vuetify.display.mdAndDown
              ? 'height: 70vh;'
              : 'padding: 2em; height: 100%;'
          "
        >
          <!-- <h1>Releases</h1> -->
          <v-row
            :style="
              $vuetify.display.mdAndDown
                ? 'align-items: stretch; height: 100%;'
                : 'row-gap: 7vh'
            "
          >
            <v-col cols="12">
              <h1
                :class="$vuetify.display.mdAndDown ? 'mobile-title' : 'title'"
                style="margin-top: 2vh"
              >
                Music
              </h1>
            </v-col>
            <v-col
              :cols="$vuetify.display.mdAndDown ? '12' : '6'"
              class="item"
              :style="$vuetify.display.xs ? 'flex-direction: column;' : ''"
            >
              <img
                :class="
                  $vuetify.display.xs
                    ? 'img-mobile'
                    : $vuetify.display.mdAndDown
                    ? 'img-md'
                    : 'img-container'
                "
                :src="require('../assets/MULT-Sleep-Cover.jpg')"
              />
              <div
                class="description"
                :style="$vuetify.display.xs ? 'margin-top: 4vw;' : ''"
              >
                <div
                  class="text"
                  :style="
                    $vuetify.display.smAndDown
                      ? 'font-size: clamp(11px, calc(11px + (14 - 11) * ((100vw - 375px) / (960 - 375))), 14px); '
                      : $vuetify.display.xs
                      ? 'margin-left: 0;'
                      : ''
                  "
                >
                  <i>"Sleep"</i> (2023)<br />Written/Recorded by us<br />Mixed/Mastered
                  by Jake Brown<br />Art by Jackson Giles
                </div>
                <div
                  :class="
                    $vuetify.display.smAndDown
                      ? 'music-icons mobile-icons'
                      : 'music-icons'
                  "
                >
                  <a
                    href="https://open.spotify.com/track/0aw5XnyEeMrvW2h6ouhYQl?si=6c89720fad324dc8"
                    target="_blank"
                    alt="Link to Spotify"
                  >
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        :width="$vuetify.display.xs ? '4vw' : '1.5vw'"
                        :height="$vuetify.display.xs ? '4vw' : '1.5vw'"
                        viewBox="0,0,256,256"
                        style="fill: #000000"
                      >
                        <g
                          fill="#a7cae4"
                          fill-rule="nonzero"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style="mix-blend-mode: normal"
                        >
                          <g transform="scale(5.12,5.12)">
                            <path
                              d="M25.009,1.982c-12.687,0 -23.009,10.322 -23.009,23.009c0,12.687 10.322,23.009 23.009,23.009c12.687,0 23.009,-10.321 23.009,-23.009c0,-12.688 -10.322,-23.009 -23.009,-23.009zM34.748,35.333c-0.289,0.434 -0.765,0.668 -1.25,0.668c-0.286,0 -0.575,-0.081 -0.831,-0.252c-2.473,-1.649 -6.667,-2.749 -10.167,-2.748c-3.714,0.002 -6.498,0.914 -6.526,0.923c-0.784,0.266 -1.635,-0.162 -1.897,-0.948c-0.262,-0.786 0.163,-1.636 0.949,-1.897c0.132,-0.044 3.279,-1.075 7.474,-1.077c3.5,-0.002 8.368,0.942 11.832,3.251c0.69,0.46 0.876,1.391 0.416,2.08zM37.74,29.193c-0.325,0.522 -0.886,0.809 -1.459,0.809c-0.31,0 -0.624,-0.083 -0.906,-0.26c-4.484,-2.794 -9.092,-3.385 -13.062,-3.35c-4.482,0.04 -8.066,0.895 -8.127,0.913c-0.907,0.258 -1.861,-0.272 -2.12,-1.183c-0.259,-0.913 0.272,-1.862 1.184,-2.12c0.277,-0.079 3.854,-0.959 8.751,-1c4.465,-0.037 10.029,0.61 15.191,3.826c0.803,0.5 1.05,1.56 0.548,2.365zM40.725,22.013c-0.373,0.634 -1.041,0.987 -1.727,0.987c-0.344,0 -0.692,-0.089 -1.011,-0.275c-5.226,-3.068 -11.58,-3.719 -15.99,-3.725c-0.021,0 -0.042,0 -0.063,0c-5.333,0 -9.44,0.938 -9.481,0.948c-1.078,0.247 -2.151,-0.419 -2.401,-1.495c-0.25,-1.075 0.417,-2.149 1.492,-2.4c0.185,-0.043 4.573,-1.053 10.39,-1.053c0.023,0 0.046,0 0.069,0c4.905,0.007 12.011,0.753 18.01,4.275c0.952,0.56 1.271,1.786 0.712,2.738z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </a>
                  <a
                    href="https://music.apple.com/us/album/sleep/1666457241?i=1666457242"
                    target="_blank"
                    alt="Link to Apple Music"
                  >
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        :width="$vuetify.display.xs ? '4vw' : '1.5vw'"
                        :height="$vuetify.display.xs ? '4vw' : '1.5vw'"
                        viewBox="0,0,256,256"
                        style="fill: #000000"
                      >
                        <g
                          fill="#a7cae4"
                          fill-rule="nonzero"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style="mix-blend-mode: normal"
                        >
                          <g transform="scale(5.12,5.12)">
                            <path
                              d="M44.52734,34.75c-1.07812,2.39453 -1.59766,3.46484 -2.98437,5.57813c-1.94141,2.95313 -4.67969,6.64063 -8.0625,6.66406c-3.01172,0.02734 -3.78906,-1.96484 -7.87891,-1.92969c-4.08594,0.01953 -4.9375,1.96875 -7.95312,1.9375c-3.38672,-0.03125 -5.97656,-3.35156 -7.91797,-6.30078c-5.42969,-8.26953 -6.00391,-17.96484 -2.64844,-23.12109c2.375,-3.65625 6.12891,-5.80469 9.65625,-5.80469c3.59375,0 5.85156,1.97266 8.82031,1.97266c2.88281,0 4.63672,-1.97656 8.79297,-1.97656c3.14063,0 6.46094,1.71094 8.83594,4.66406c-7.76562,4.25781 -6.50391,15.34766 1.33984,18.31641zM31.19531,8.46875c1.51172,-1.94141 2.66016,-4.67969 2.24219,-7.46875c-2.46484,0.16797 -5.34766,1.74219 -7.03125,3.78125c-1.52734,1.85938 -2.79297,4.61719 -2.30078,7.28516c2.69141,0.08594 5.47656,-1.51953 7.08984,-3.59766z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </a>
                  <a
                    href="https://youtu.be/qGjYhNxiXQw?si=vGn-apYW_7N8tAIa"
                    target="_blank"
                    alt="Link to YouTube"
                  >
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        :width="$vuetify.display.xs ? '4vw' : '1.5vw'"
                        :height="$vuetify.display.xs ? '4vw' : '1.5vw'"
                        viewBox="0,0,256,256"
                        style="fill: #000000"
                      >
                        <g
                          fill="#a7cae4"
                          fill-rule="nonzero"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style="mix-blend-mode: normal"
                        >
                          <g transform="scale(5.12,5.12)">
                            <path
                              d="M44.89844,14.5c-0.39844,-2.19922 -2.29687,-3.80078 -4.5,-4.30078c-3.29687,-0.69922 -9.39844,-1.19922 -16,-1.19922c-6.59766,0 -12.79687,0.5 -16.09766,1.19922c-2.19922,0.5 -4.10156,2 -4.5,4.30078c-0.40234,2.5 -0.80078,6 -0.80078,10.5c0,4.5 0.39844,8 0.89844,10.5c0.40234,2.19922 2.30078,3.80078 4.5,4.30078c3.5,0.69922 9.5,1.19922 16.10156,1.19922c6.60156,0 12.60156,-0.5 16.10156,-1.19922c2.19922,-0.5 4.09766,-2 4.5,-4.30078c0.39844,-2.5 0.89844,-6.10156 1,-10.5c-0.20312,-4.5 -0.70312,-8 -1.20312,-10.5zM19,32v-14l12.19922,7z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </a>
                  <a
                    href="https://mult-band.bandcamp.com/track/sleep"
                    target="_blank"
                    alt="Link to Bandcamp"
                  >
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        :width="$vuetify.display.xs ? '4vw' : '1.5vw'"
                        :height="$vuetify.display.xs ? '4vw' : '1.5vw'"
                        viewBox="0,0,256,256"
                        style="fill: #000000"
                      >
                        <g
                          fill="#a7cae4"
                          fill-rule="evenodd"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style="mix-blend-mode: normal"
                        >
                          <g transform="scale(8.53333,8.53333)">
                            <path
                              d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM17.333,18.774h-8.755l4.089,-7.547h8.755z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </a>
                  <a
                    class="link-button"
                    href="https://tr.ee/TowYKoumED"
                    target="_blank"
                    alt="Other Links"
                  >
                    <v-btn
                      variant="plain"
                      style="font-weight: bold"
                      :size="$vuetify.display.mdAndDown ? 'x-small' : 'small'"
                      >+ MORE</v-btn
                    >
                  </a>
                </div>
              </div>
            </v-col>
            <v-col
              :cols="$vuetify.display.mdAndDown ? '12' : '1'"
              :class="$vuetify.display.mdAndDown ? 'mobile-line' : ''"
            >
              <div v-if="!$vuetify.display.mdAndDown" class="vl"></div>
              <hr v-if="$vuetify.display.mdAndDown" class="line" />
            </v-col>
            <v-col :cols="$vuetify.display.mdAndDown ? '12' : '5'" class="item">
              <h1
                :class="$vuetify.display.mdAndDown ? 'mobile-title' : 'title'"
              >
                Much more to come...
              </h1>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  mounted() {
    this.$emit("listen", false);

    // desktop animations
    gsap.from(".music-item", {
      duration: 2,
      opacity: 0,
      y: -50,
      ease: "power2.out",
    });
    gsap.from(
      [".text", ".img-container", ".line", ".vl", ".title", ".music-icons"],
      {
        duration: 2,
        opacity: 0,
        y: -50,
        ease: "power2.out",
      }
    );

    // mobile animations
    gsap.from([".mobile-title", ".img-mobile"], {
      duration: 2,
      opacity: 0,
      y: -50,
      ease: "power2.out",
    });
  },
  components: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.music-container {
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.music-item {
  display: flex;
  // flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: linear-gradient(
    to bottom right,
    rgba(0, 32, 31, 0.7),
    rgba(0, 0, 0, 1)
  );
  width: 80vw;
  height: 100%;
  backdrop-filter: blur(2px);
  border-radius: 25px;
  gap: 5em;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-container {
  width: 35%;
  height: auto;
}
.img-md {
  width: 25%;
  height: auto;
}
.img-mobile {
  width: 45%;
  height: auto;
}
.description {
  display: grid;
  // font-size: 12px;
}
.text {
  text-align: left;
  font-size: 15px;
  margin-left: 2em;
}
.text-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 55vh;
}
.title {
  font-size: 2.5vw;
}
.mobile-title {
  font-size: clamp(
    24px,
    calc(24px + (44 - 24) * ((100vw - 375px) / (1280 - 375))),
    44px
  );
  margin-bottom: 2vh;
}
.vl {
  border-right: 2px solid #a7cae4;

  height: 35vh;
}
.line {
  // display: block;
  border: 1px solid #a7cae4;
  width: 50vw;
}
.mobile-line {
  display: flex;
  justify-content: center;
  align-items: center;
}
.music-icons {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 2vw;
  margin-left: 2vw;
}
.music-icons button {
  padding: 0;
}
.music-icons > * {
  margin: 0.5em;
}
.link-button {
  text-decoration: none;
  color: inherit;
}
.mobile-img {
  height: auto;
  width: 50vw;
}

.link-button:hover,
.link-button:focus {
  text-decoration: none;
  color: inherit;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
