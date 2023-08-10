<template>
  <div class="merch-page">
    <div class="merch-container">
      <div class="content-container">
        <div class="item-container">
          <div v-for="(item, i) in items" :key="i">
            <v-img class="items" :src="item.img" alt="" />
            <p class="merch-title items">{{ item.title }}</p>
            <div class="size-container">
              <!-- New div to wrap size buttons -->
              <div
                v-for="size in item.sizes"
                :key="size"
                class="size-box items"
              >
                <button
                  class="size-button"
                  :class="{
                    'size-button-selected': item.selectedSize === size,
                  }"
                  @click="selectSize(size, i)"
                >
                  {{ size }}
                </button>
              </div>
            </div>
            <v-btn
              class="cart-button items"
              :disabled="!items[i].selectedSize"
              elevation="0"
              @click="addToCart(items[i], i)"
              >Add To Cart</v-btn
            >
          </div>
        </div>
      </div>
      <div class="content-container">
        <div class="payment-box">
          <p class="merch-title cart-desc">CART</p>
          <hr class="line" />
          <div v-for="item in included" :key="item">
            <p class="merch-title cart-desc">
              {{ item.title }} || SIZE: {{ item.selectedSize }}
            </p>
          </div>
          <hr class="line" />
          <p class="cart-desc">SUBTOTAL : ${{ subtotal }}</p>
          <p class="cart-desc">TAX : ${{ tax }}</p>
          <p class="merch-title cart-desc">TOTAL : ${{ total }}</p>
          <v-btn
            class="cart-button checkout-button"
            :disabled="subtotal == 0"
            elevation="0"
            >CHECKOUT</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import merchInfo from "../merch/merchInfo.json";
export default {
  data() {
    return {
      //   sizes: ["S", "M", "L", "XL", "2XL"], // connect sizes backend later
      sizeSelect: [],
      selected: false,
      //   merch: {},
      items: [],
      added: [],
      //   include: {},
    };
  },
  mounted() {
    this.items = merchInfo.items;
    this.items = merchInfo.items.map((item) => {
      return {
        ...item,
        img: require(`../assets/${item.img}.png`), // dynamic import based on the img identifier
      };
    });
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
      return this.subtotal ? (this.subtotal * 0.0825).toFixed(2) : 0;
    },
    total() {
      return this.subtotal ? (this.subtotal * 1.0825).toFixed(2) : 0;
    },
  },
  methods: {
    selectSize(size, i) {
      this.items[i].selectedSize =
        this.items[i].selectedSize === size ? null : size;
      console.log(
        `Selected size ${this.items[i].selectedSize} for item at index ${i}`
      );
    },
    addToCart(item, index) {
      this.added.push({
        ...item,
        included: true,
      });
      this.items[index].selectedSize = null; // Reset the selected size
      console.log(item);
    },
  },
};
</script>

<style lang="scss" scoped>
.merch-page {
  display: flex;
  justify-content: center;
  //   align-items: center;
  width: 100vw;
  height: 80vh;
}
.merch-container {
  display: flex;
  gap: 5em;
  margin-top: 5vh;
}
.item-container {
  display: grid;
  grid-template-rows: repeat(3, 1fr); // Adjust based on your design
  // gap: 5em;
  max-height: 60vh;
  // width: 30vw;
  padding: 1em;
  // background: rgba(26, 28, 26, 0.01);
  // background: rgba(26, 28, 26, 0.5);
  backdrop-filter: blur(2px);
  border-radius: 10px;
}
.items {
  margin: 0.5em;
}
.merch-title {
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50;
  // color: rgba(184, 221, 250, 0.9);
  filter: blur(0.3px);
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
  // border: 3px solid rgba(184, 221, 250, 0.9);
  border: 3px solid #2c3e50;

  margin: 10px;
  padding: 1px;
  //   font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
  // color: rgba(184, 221, 250, 0.9);
  filter: blur(0.3px);
}
.size-button-selected {
  background-color: #2c3e50;
  mix-blend-mode: difference;
  color: rgba(184, 221, 250, 0.9);
}
.cart-button {
  font-weight: bold;
  filter: blur(0.25px);
  background-color: rgba(236, 247, 255, 0.9);
  color: #2c3e50;
}
.content-container {
  height: auto;
  max-height: 65vh;
  // display: flex;
  width: 30vw;
  padding: 1em;
  background: rgba(26, 28, 26, 0.01);
  backdrop-filter: blur(2px);
  border-radius: 10px;
}
.payment-box {
  display: grid;
  justify-items: start;
  //   align-items: flex-start;
  background: rgba(26, 28, 26, 0.5);
  border-radius: 10px;
  padding: 1.5em;
  gap: 0.5em;
}
.line {
  width: -webkit-fill-available;
  width: fill;
  mix-blend-mode: difference;
  border-color: rgba(184, 221, 250, 0.8);
  background-color: rgba(184, 221, 250, 0.8);
  color: rgba(184, 221, 250, 0.9);
}
.cart-desc {
  font-size: 1.5em;
  mix-blend-mode: difference;
  color: rgba(184, 221, 250, 0.9);
}
.checkout-button {
  background-color: rgba(236, 247, 255, 0.9);
}
</style>
