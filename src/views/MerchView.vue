<template>
  <div class="merch-page">
    <div
      class="merch-container"
      :style="
        $vuetify.display.mdAndDown ? 'align-items: center;' : 'height: 100%'
      "
    >
      <v-row>
        <v-col :cols="$vuetify.display.mdAndDown ? '12' : '6'">
          <div
            class="item-container"
            :style="
              $vuetify.display.mdAndDown
                ? 'height: 70vh; align-items: center;'
                : ''
            "
          >
            <div
              v-for="(item, i) in items"
              :key="i"
              class="item"
              :style="
                $vuetify.display.xs
                  ? 'height: 100%'
                  : $vuetify.display.mdAndDown
                  ? 'height: 80%'
                  : ''
              "
            >
              <img
                :class="$vuetify.display.mdAndDown ? 'img-mobile' : 'image'"
                :src="item.images[0].secure_url"
                alt=""
              />
              <p class="merch-title">{{ item.name }} | | ${{ item.price }}</p>
              <div class="size-container">
                <div
                  v-for="size in item.options"
                  :key="size"
                  class="size-box"
                  :style="$vuetify.display.mdAndDown ? '' : 'margin: 10px;'"
                >
                  <button
                    class="size-button"
                    :class="{
                      'size-button-selected': item.selectedSize === size.name,
                    }"
                    @click="selectSize(size.name, i)"
                  >
                    {{ size.name }}
                  </button>
                </div>
              </div>
              <v-btn
                v-if="!$vuetify.display.mdAndDown"
                class="cart-button"
                :disabled="!items[i].selectedSize"
                elevation="0"
                @click="addToCart(items[i], i)"
                >Add To Cart</v-btn
              >
              <a
                v-if="$vuetify.display.mdAndDown && items[i].selectedSize"
                href="https://multusa.bigcartel.com/product/mult-t-shirt"
                target="_blank"
                style="text-decoration: none"
                alt="Link to external store page"
              >
                <v-btn
                  class="cart-button checkout-button"
                  :disabled="!items[i].selectedSize"
                  elevation="0"
                  append-icon="mdi-vector-link"
                  >PURCHASE</v-btn
                >
              </a>
              <v-btn
                v-if="$vuetify.display.mdAndDown && !items[i].selectedSize"
                class="cart-button checkout-button"
                :disabled="!items[i].selectedSize"
                elevation="0"
                append-icon="mdi-vector-link"
                >PURCHASE</v-btn
              >
            </div>
          </div>
        </v-col>
        <v-col v-if="!$vuetify.display.mdAndDown" cols="6">
          <div class="payment-box">
            <p class="merch-title cart-desc">CART</p>
            <hr class="line" />
            <div v-for="(item, i) in included" :key="item">
              <div class="cart-item">
                <p class="merch-title cart-desc">
                  {{ item.name }} || SIZE: {{ item.selectedSize }}
                </p>
                <v-btn variant="plain" @click="remove(i)"
                  ><v-icon color="#B8DDFA" size="large"
                    >mdi-close</v-icon
                  ></v-btn
                >
              </div>
            </div>
            <hr class="line" />
            <p class="cart-desc">SUBTOTAL : ${{ subtotal }}</p>
            <p class="cart-desc">TAX : ${{ tax }}</p>
            <p class="merch-title cart-desc">TOTAL : ${{ total }}</p>
            <a
              v-if="subtotal != 0"
              href="https://multusa.bigcartel.com/product/mult-t-shirt"
              target="_blank"
              alt="Link to external store page"
            >
              <v-btn
                class="cart-button checkout-button"
                :disabled="subtotal == 0"
                elevation="0"
                append-icon="mdi-vector-link"
                >CHECKOUT</v-btn
              >
            </a>
            <v-btn
              v-else
              class="cart-button checkout-button"
              :disabled="true"
              elevation="0"
              append-icon="mdi-vector-link"
              >CHECKOUT</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { gsap } from "gsap";
export default {
  data() {
    return {
      sizeSelect: [],
      selected: false,
      items: [],
      added: [],
    };
  },
  mounted() {
    this.$emit("listen", false);

    this.fetchItems();
    gsap.from(".merch-container", {
      duration: 2,
      opacity: 0,
      y: -50,
      ease: "power2.out",
    });
    // gsap.from(".items", {
    //   duration: 2,
    //   opacity: 0,
    //   y: -50,
    //   ease: "power2.out",
    // });
  },
  computed: {
    included() {
      return this.added.filter((item) => {
        return item.included;
      });
    },
    subtotal() {
      let theReturn = 0;

      this.included.forEach((item) => {
        theReturn +=
          item.price !== "Custom Pricing" ? parseFloat(item.price) : 0;
      });

      return theReturn.toFixed(2);
    },
    tax() {
      return this.subtotal ? (this.subtotal * 0.0975).toFixed(2) : 0;
    },
    total() {
      return this.subtotal ? (this.subtotal * 1.0825).toFixed(2) : 0;
    },
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get(
          "https://api.bigcartel.com/multusa/products"
        );
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    selectSize(size, i) {
      this.items[i].selectedSize =
        this.items[i].selectedSize === size ? null : size;
    },
    addToCart(item, index) {
      this.added.push({
        ...item,
        included: true,
      });
      this.items[index].selectedSize = null;
    },
    remove(i) {
      this.added.splice(i, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.merch-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
}
.merch-container {
  display: flex;
  gap: 5em;
  width: 80vw;
}
.item-container {
  display: grid;
  align-items: center;
  padding: 1em;
  // background: rgba(26, 28, 26, 0.7);
  // background: rgba(0, 32, 31, 0.7);
  background: linear-gradient(
    to bottom right,
    rgba(0, 32, 31, 0.7),
    rgba(0, 0, 0, 1)
  );
  backdrop-filter: blur(2px);
  border-radius: 25px;
  height: 100%;
}
.item {
  display: grid;
  // row-gap: 2em;
  justify-items: center;
  align-items: center;
  height: 90%;
}
.items {
  margin: 0.5em;
}
.image {
  width: 100%;
  height: 45vh;
  object-fit: contain;
}
.img-md {
  width: 100%;
  height: 30vh;
  object-fit: contain;
}
.img-tablet {
  width: 100%;
  height: 30vh;
  object-fit: contain;
}
.img-mobile {
  width: 100%;
  height: 30vh;
  object-fit: contain;
}
.merch-title {
  font-size: 1.5em;
  font-weight: bold;
  color: rgba(184, 221, 250);
}
.size-box {
  display: inline-block;
  justify-content: center;
  //   filter: blur(0.75px);
  //   padding: 5px;
}
.size-button {
  height: 2.2em;
  width: 2.2em;
  border: 3px solid #b2d3ee;
  // border: 3px solid #2c3e50;

  margin: 8px;
  padding: 1px;
  //   font-size: 1.2em;
  font-weight: bold;
  // color: #2c3e50;
  color: rgba(184, 221, 250, 0.9);
  // filter: blur(0.3px);
  border-radius: 10px;
}
.size-button:hover {
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
.size-button-selected {
  background-color: #b2d3ee;
  // mix-blend-mode: difference;
  // color: rgba(184, 221, 250, 0.9);
  color: #2c3e50;
}
.cart-button {
  font-weight: bold;
  // filter: blur(0.25px);
  background-color: #b2d3ee;
  color: #2c3e50;
  border-radius: 10px;
  transition: color 0.3s ease, opacity 0.3s ease;
}
.cart-button:hover {
  opacity: 0.8;
  transition: opacity 0.5s ease;
}
.payment-box {
  display: grid;
  justify-items: start;
  //   align-items: flex-start;
  // background: rgba(26, 28, 26, 0.7);
  // background: rgba(0, 32, 31, 0.7);
  background: linear-gradient(
    to bottom left,
    rgba(0, 32, 31, 0.7),
    rgba(0, 0, 0, 1)
  );
  border-radius: 25px;
  padding: 1.5em;
  gap: 0.5em;
}
.line {
  width: -webkit-fill-available;
  width: fill;
  // mix-blend-mode: difference;
  border-color: rgba(184, 221, 250, 0.8);
  background-color: rgba(184, 221, 250, 0.8);
  color: rgba(184, 221, 250, 0.9);
}
.cart-desc {
  font-size: 1.5em;
  // mix-blend-mode: difference;
  color: rgba(184, 221, 250);
}
.cart-item {
  display: flex;
}
.checkout-button {
  background-color: #b2d3ee;
  border-radius: 10px;
  // text-decoration: none;
  // color: inherit;
}
.icon {
  color: #2c3e50 !important;
}
.temp {
  background: rgba(26, 28, 26, 0.5);
}
</style>
