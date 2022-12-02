import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB06fAqNhqfioR6eChcUY2Ica6y2QuDzTc",
  authDomain: "vue-contacts-dev.firebaseapp.com",
  projectId: "vue-contacts-dev",
  storageBucket: "vue-contacts-dev.appspot.com",
  messagingSenderId: "1098138762482",
  appId: "1:1098138762482:web:03ae5c7a0085af617a246b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lew3kgjAAAAAGIsVjOnwsVyXHPd3gY3jfinRx_c"),
  isTokenAutoRefreshEnabled: true,
});
