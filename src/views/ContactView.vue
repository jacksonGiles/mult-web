<template>
  <div
    class="contact-page"
    :style="$vuetify.display.smAndDown ? 'align-items: center;' : ''"
  >
    <v-container class="contact-container">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        mode="out-in"
      >
        <!-- <div class="form-bg"> -->
        <div class="inner">
          <div v-if="!successMessage" class="form-items">
            <h2 class="title">Contact Us</h2>
            <v-form
              ref="form"
              class="form"
              :style="
                $vuetify.display.smAndDown
                  ? ''
                  : 'margin: 0 3em 0 3em; row-gap: 1em; flex-grow: 1;'
              "
              v-model="valid"
              lazy-validation
            >
              <!-- <v-text-field label="test"></v-text-field> -->
              <v-text-field
                v-model="name"
                label="Name"
                variant="outlined"
                base-color="#B8DDFA"
                color="#B8DDFA"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                variant="outlined"
                base-color="rgba(184, 221, 250, 0.9)"
                color="rgba(184, 221, 250, 0.9)"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                v-model="subject"
                label="Subject"
                variant="outlined"
                base-color="rgba(184, 221, 250, 0.9)"
                color="rgba(184, 221, 250, 0.9)"
                :rules="subjectRules"
              ></v-text-field>
              <v-textarea
                v-model="message"
                label="Message"
                variant="outlined"
                base-color="rgba(184, 221, 250, 0.9)"
                color="rgba(184, 221, 250, 0.9)"
                :rules="messageRules"
                counter
                no-resize
              ></v-textarea>
            </v-form>
            <div>
              <v-btn
                class="contact-btn"
                variant="outlined"
                elevation="0"
                color="rgba(184, 221, 250, 0.9)"
                :disabled="!valid"
                @click="submit"
                >Submit</v-btn
              >
            </div>
          </div>
          <div v-else class="success">
            <h1 class="title">Thanks, we'll get back to you soon!</h1>
            <v-icon class="check">mdi-check</v-icon>
            <v-btn
              class="contact-btn"
              variant="tonal"
              elevation="0"
              color="rgba(184, 221, 250, 0.9)"
              @click="
                reset();
                this.successMessage = false;
              "
              size="small"
              >Okay</v-btn
            >
          </div>
        </div>
      </transition>
    </v-container>
  </div>
</template>

<script>
import { gsap } from "gsap";
import db from "/firebaseinit.js";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
export default {
  mounted() {
    this.$emit("listen", false);
    gsap.from(".contact-container", {
      duration: 2, // animation duration in seconds
      opacity: 0,
      y: -50,
      ease: "power2.out", // easing function
    });
    gsap.from(".success", {
      duration: 2, // animation duration in seconds
      opacity: 0,
      // y: -50,
      ease: "power2.out", // easing function
    });
  },
  data() {
    return {
      valid: false,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 32) || "Name must be less than 32 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      subject: "",
      subjectRules: [
        (v) => !!v || "Subject is required",
        (v) =>
          (v && v.length <= 60) || "Subject must be less than 60 characters",
      ],
      message: "",
      messageRules: [
        (v) => !!v || "Message is required",
        (v) =>
          (v && v.length <= 1500) ||
          "Message must be less than 1500 characters",
      ],
      successMessage: false,
    };
  },
  methods: {
    beforeEnter(el) {
      this.$store.dispatch("startTransition");
      gsap.set(el, { opacity: 0 });
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          done();
          this.$store.dispatch("endTransition");
        },
      });
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          done();
          this.$store.dispatch("endTransition");
        },
      });
    },
    async submit() {
      if (this.$store.state.isTransitioning || !this.valid) return;

      await addDoc(collection(db, "messages"), {
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
        timestamp: serverTimestamp(),
      })
        .then(() => {
          this.successMessage = true;
          console.log("Message sent successfully");
        })
        .catch((error) => {
          console.error("Error sending message: ", error);
        });

      this.reset();
    },
    reset() {
      if (this.$store.state.isTransitioning) return;
      this.name = "";
      this.email = "";
      this.subject = "";
      this.message = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
}
.contact-container {
  display: grid;
  align-items: center;
  // background: rgba(0, 32, 31, 0.7);
  background: linear-gradient(
    to bottom right,
    rgba(0, 32, 31, 0.7),
    rgba(0, 0, 0, 1)
  );
  backdrop-filter: blur(2px);
  border-radius: 25px;
  width: 80vw;
  height: fit-content;
}
.inner {
  display: grid;
  align-items: center;
  margin: 2vh 0;
  height: 100%;
}
.success {
  display: grid;
  justify-items: center;
  align-content: space-evenly;
  row-gap: 2em;
}
.form-items {
  display: grid;
  row-gap: 2vh;
}
.form {
  display: grid;
}
.title {
  color: rgba(184, 221, 250, 0.8);
  // filter: blur(0.3px);
}
.contact-btn {
  font-weight: bold;
}
.check {
  color: rgba(184, 221, 250, 0.8);
  // filter: blur(0.4px);
  font-size: 3em;
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
