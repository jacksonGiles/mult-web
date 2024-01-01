import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createVuetify } from "vuetify"; // Import createVuetify
import "vuetify/styles"; // Import Vuetify styles
import { loadFonts } from "./plugins/webfontloader";
import "/styles.scss";
import breakpointMixin from "./mixins/breakpointMixin";

loadFonts();

// Create a Vuetify instance
const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
});

// Create the Vue application
const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(vuetify) // Use the Vuetify instance
  .mount("#app");
app.mixin(breakpointMixin);
