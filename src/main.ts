import "./assets/main.css";
import "./assets/index.css";
import "preline/preline";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
//prime
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import "quill/dist/quill.snow.css";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labsComponent from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, fa } from "vuetify/iconsets/fa";
import { mdi } from "vuetify/iconsets/mdi";
//in it vuetify
const vuetify = createVuetify({
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  components: {
    ...components,
    ...labsComponent,
  },
  directives,
});
const app = createApp(App);
app.use(vuetify);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
      preset: Aura,
      options: {
        darkModeSelector: 'none',
    }
  }
});
app.mount("#app");
