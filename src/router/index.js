import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/bmap",
    name: "BMap",
    component: () => import ('./../views/BMap.vue')
  },
  {
    path: "/bmap2",
    name: "BMap2",
    component: () => import ('./../views/BMap2.vue')
  },
  {
    path: "/word",
    name: "word",
    component: () => import ('./../views/WordCloud.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
