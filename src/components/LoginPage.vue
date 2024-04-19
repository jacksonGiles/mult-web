<template>
  <div class="login-page">
    <v-icon class="lock">mdi-lock-outline</v-icon>
    <v-form ref="form" v-model="valid" lazy-validation>
      <div>
        <input
          class="input"
          :style="
            $vuetify.display.xs
              ? 'width: 50vw;'
              : $vuetify.display.mdAndDown
              ? 'width: 30vw;'
              : 'width: 13vw;'
          "
          type="password"
          v-model="password"
          placeholder="Enter password"
        />
        <v-btn icon="" variant="plain" color="#080808" @click="submit">
          <v-icon class="icon">mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-form>
    <div v-if="isError" class="error-message">
      <p style="color: red">{{ errorMessage }}</p>
    </div>
    <div v-if="!isError" class="safari-message">
      <p
        style="color: #080808"
        :style="$vuetify.display.xs ? 'max-width: 250px' : ''"
        v-html="isSafari ? browserMessage : null"
      ></p>
      <p
        style="color: #080808"
        v-html="$vuetify.display.mdAndDown ? mobileMessage : null"
      ></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isError", "errorMessage"],
  mounted() {
    this.isSafari =
      !navigator.userAgent.includes("Chrome") &&
      navigator.userAgent.includes("Safari");
  },
  data() {
    return {
      valid: false,
      password: "",
      isSafari: false,
      mobileMessage: "For mobile devices, please turn on ringer.",
      browserMessage:
        "Please use Google Chrome for best audio and visual experience.",
    };
  },
  methods: {
    submit() {
      this.$emit("login", this.password);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #e8e8e8;
}
.lock {
  color: #757575;
  font-size: 10vh;
  margin-bottom: 5vh;
}
.input-container {
  position: relative;
  display: inline-block;
}
.input {
  color: #080808;
  border: 2px solid #757575; // Add thickness and style to the border
  padding: 10px; // Add some padding for better text visibility
  font-size: 16px; // Increase font size for better readability
  border-radius: 4px; // Rounded corners for a modern look
  outline: none; // Remove the default focus outline
  transition: border-color 0.3s, box-shadow 0.3s; // Smooth transition for focus

  &:focus {
    border-color: #080808; // Change border color on focus
    box-shadow: 0 0 2px rgba(8, 8, 8, 0.5); // Add a subtle focus glow
  }
}
.icon {
  font-size: 25px;
  color: #080808;
}

.error-message {
  position: absolute;
  bottom: 35%;
  color: red;
}
.safari-message {
  position: absolute;
  bottom: 30%;
}
</style>
