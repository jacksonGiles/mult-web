/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import MusicView from "../views/MusicView.vue";
import MerchView from "../views/MerchView.vue";
// import ListenView from "../views/ListenView.vue";
// import SandboxView from "../views/SandboxView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { title: "MULT | HOME" },
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   component: AboutView,
  // },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
    meta: { title: "MULT | CONTACT" },
  },
  // {
  //   path: "/listen",
  //   name: "Listen",
  //   component: ListenView,
  // },
  {
    path: "/music",
    name: "Music",
    component: MusicView,
    meta: { title: "MULT | MUSIC" },
  },
  {
    path: "/merch",
    name: "Merch",
    component: MerchView,
    meta: { title: "MULT | MERCH" },
  },
  // {
  //   path: "/sandbox",
  //   name: "Sandbox",
  //   component: SandboxView,
  // },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
