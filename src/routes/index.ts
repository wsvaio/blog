import { RouteRecordRaw } from "vue-router";
import Admin from "./admin/index.vue";
import Blog from "./blog/index.vue";
import KeepAlive from "./keep-alive/index.vue";
import RouterView from "./router-view/index.vue";

export const adminMap: RouteRecordRaw[] = [


  {
    path: "about", name: "about",
    meta: { title: "About", icon: "menu" },
    component: () => import("@/views/admin/about/index.vue"),

  },

];


export const blogMap: RouteRecordRaw[] = [

  {
    path: "home", name: "home",
    meta: { title: "Home", icon: "menu" },
    component: () => import("@/views/home/index.vue"),
  },


];

const routes: RouteRecordRaw[] = [
  {
    path: "/", name: "blog", redirect: { name: "home" },
    component: Blog, children: blogMap
  },
  {
    path: "/admin", name: "admin", redirect: { name: "about" },
    component: Admin, children: adminMap,
  },
  {
    path: "/admin/login", name: "login",
    component: () => import("@/views/admin/login/index.vue")
  },
  {
    path: "/:pathMatch(.*)", name: "notfound",
    component: () => import("./notfound/index.vue")
  }
];




export default routes;