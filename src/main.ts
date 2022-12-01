import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
  IoPersonCircle,
  MdAddcircleoutlineOutlined,
  MdArrowbackOutlined,
  MdCakeOutlined,
  MdClearRound,
  MdDeleteoutline,
  MdEmailOutlined,
  MdLogoutOutlined,
  MdMailOutlined,
  MdModeeditOutlined,
  MdMorevertOutlined,
  MdPersonoutlineOutlined,
  MdPhoneOutlined,
  MdPhotocameraOutlined,
  MdSaveOutlined,
  MdSearchOutlined,
  MdStarborderOutlined,
} from "oh-vue-icons/icons";
import { createPinia } from "pinia";
import { createApp, type App } from "vue";
import { vfmPlugin } from "vue-final-modal";

import AppComponent from "./App.vue";
import router from "./router";

import "tw-elements";
import "./assets/main.scss";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

addIcons(
  IoPersonCircle,
  MdSearchOutlined,
  MdArrowbackOutlined,
  MdClearRound,
  MdModeeditOutlined,
  MdDeleteoutline,
  MdStarborderOutlined,
  MdMorevertOutlined,
  MdMailOutlined,
  MdPhoneOutlined,
  MdCakeOutlined,
  MdLogoutOutlined,
  MdAddcircleoutlineOutlined,
  MdSaveOutlined,
  MdEmailOutlined,
  MdPersonoutlineOutlined,
  MdPhotocameraOutlined
);

let app: App;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(AppComponent);
    app.use(createPinia());
    app.use(router);
    app.use(vfmPlugin);
    app.component("v-icon", OhVueIcon);
    app.mount("#app");
  }
});
