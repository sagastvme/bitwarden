import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router.js';




import store from "./store.js";





import { OhVueIcon } from "oh-vue-icons";
const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.use(router);
app.use(store);
app.mount("#app");



