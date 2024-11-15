import "./assets/tailwind.css";
import "element-plus/dist/index.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { TheMask } from "vue-the-mask";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.directive("mask", TheMask);

app.mount("#app");
