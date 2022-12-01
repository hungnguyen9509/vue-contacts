import CreateContactView from "@/views/CreateContactView.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ContactDetailsView from "@/views/ContactDetailsView.vue";
import AboutView from "@/views/AboutView.vue";
import ProfileView from "@/views/ProfileView.vue";
import { auth } from "@/firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: {
        title: "Profile",
        requiresAuth: true,
      },
    },
    {
      path: "/contact/:contactId",
      name: "contact-details",
      component: ContactDetailsView,
      meta: {
        title: "Detail",
        requiresAuth: true,
      },
    },
    {
      path: "/contact/create",
      name: "contact-create",
      component: CreateContactView,
      meta: {
        title: "Edit",
        requiresAuth: true,
      },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: {
        title: "About",
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title} | Vue Contact`;

  const user = auth.currentUser;

  if (to.meta.requiresAuth) {
    if (user) next();
    else next({ name: "login" });
  } else {
    if (user) next({ name: "home" });
    else next();
  }
});

export default router;
