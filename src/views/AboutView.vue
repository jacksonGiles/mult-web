<template>
  <div class="about-page">
    <div class="about-content">
      <div id="pic-display">
        <img
          class="display"
          :src="
            display
              ? displaySrc.src
              : 'https://drive.google.com/uc?export=view&id=1E3Bi1keCtuQifhYU9Y7nNng2xMeBA_vW'
          "
          alt=""
        />
      </div>
      <div id="pic-track">
        <img
          v-for="(pic, index) in picTrack"
          :key="index"
          class="pic"
          :src="pic.src"
          :alt="pic.alt"
          @click="setDisplay(pic)"
        />
      </div>
      <div class="description">
        <p>
          MULT is a band from Chattanooga, TN. Formed in the summer of 2022, the
          group has sought out to form a sonic landscape of gritty shoegaze
          guitars, lush ambience,
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("listen", false);
  },
  data() {
    return {
      picTrack: [
        {
          src: "https://drive.google.com/uc?export=view&id=1oX-SWscOgbZEXdbwLCNcY1NUEUpFh1ph",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1VZI6kuPZrTFLhBoxW1som4eQL3g-xlk8",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1z-uVYtEL7232Nr2ZS8Lg2jYEfGVliJca",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1IDvVsHj563TO3G6oDryTaWEtA_h7mdAS",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1nKOrQb6PtUOPzH-xeUvnzQU5jfiX-OJI",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1Z2xo2LRerFabh65M5CPoIypOyLivsxCI",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=147phwSmaD_TF-zsbMzB-7RdGgXNFcyZW",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1upIvfqFvuHQI4Q59ywQ5mGZxM6pPaIfO",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1xbTDQhIrsTG4uQAr8yMUWD7gUlR9qhQ_",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1E3Bi1keCtuQifhYU9Y7nNng2xMeBA_vW",
          alt: "",
        },
        {
          src: "https://drive.google.com/uc?export=view&id=1JxpRHLoYYRvWaRRZczwIzeR5H2ckSyD9",
          alt: "",
        },
      ],
      display: false,
      displaySrc: { src: "", alt: "" },
    };
  },
  methods: {
    setDisplay(pic) {
      // console.log("here: ");
      this.display = true;
      this.displaySrc.src = pic.src;
      this.displaySrc.alt = pic.alt;
    },
  },
};
</script>

<style lang="scss" scoped>
.about-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
}
.about-content {
  display: grid;
  align-items: center;
  // background: rgba(26, 28, 26, 0.7);
  border-radius: 15px;
  width: 80vw;
  height: 80vh;
  // margin: 0rem;
}
#pic-display {
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;

  // background-color: blue;
}
#pic-display > .display {
  height: 30em;
  object-fit: cover;
  object-position: 100% center;
}
#pic-track {
  display: flex;
  // flex-direction: row;
  gap: 1vmin;
  overflow-x: scroll;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 4;
  // width: 50vw;
  // position: absolute;
  // left: 50%;
  // top: 50%;
  // transform: translate(0%, -50%);
  // user-select: none; /* -- Prevent image highlighting -- */

  // background-color: red;
}
#pic-track > .pic {
  // width: 40vmin;
  height: 10em;
  object-fit: cover;
  object-position: 100% center;
}
.description {
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
  width: 30vw;

  background: rgba(26, 28, 26, 0.7);
  height: fit-content;

  // background-color: yellow;
}
</style>
