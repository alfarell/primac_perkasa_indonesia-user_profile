import { createApp } from "vue";
import "./style.css";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";
import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: {
      ...Aura,
      semantic: {
        ...Aura.semantic,
        primary: {
          50: "{sky.50}",
          100: "{sky.100}",
          200: "{sky.200}",
          300: "{sky.300}",
          400: "{sky.400}",
          500: "{sky.500}",
          600: "{sky.600}",
          700: "{sky.700}",
          800: "{sky.800}",
          900: "{sky.900}",
          950: "{sky.950}",
        },
      },
    },
    options: {
      darkModeSelector: "light",
      // cssLayer: false,
    },
  },
});
app.use(ToastService);
app.mount("#app");
