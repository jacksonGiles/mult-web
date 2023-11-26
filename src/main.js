import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { createVuetify } from "vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "/styles.scss";

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");

export default createVuetify({
  theme: {
    defaultTheme: "dark",
  },
});
