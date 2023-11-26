import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import MusicView from "../views/MusicView.vue";
import MerchView from "../views/MerchView.vue";
import ListenView from "../views/ListenView.vue";
import SandboxView from "../views/SandboxView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
  },
  {
    path: "/listen",
    name: "Listen",
    component: ListenView,
  },
  {
    path: "/music",
    name: "Music",
    component: MusicView,
  },
  {
    path: "/merch",
    name: "Merch",
    component: MerchView,
  },
  {
    path: "/sandbox",
    name: "Sandbox",
    component: SandboxView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
