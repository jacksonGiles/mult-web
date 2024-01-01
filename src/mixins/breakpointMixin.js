import { useDisplay } from "vuetify";

export default {
  setup() {
    const display = useDisplay();
    return { display };
  },
};
