import { RouteRecordRaw } from "vue-router";
import Admin from "./admin/index.vue";
import Blog from "./blog/index.vue";
import vrouter from "./vrouter/index.vue";

export const adminRoutes: RouteRecordRaw[] = [



  {
    path: "article", name: "article",
    meta: { title: "文章", icon: "menu" },
    component: () => import("@/views/admin/article/index.vue"),
  },
  {
    path: "tag", name: "tag",
    meta: { title: "标签", icon: "menu" },
    component: () => import("@/views/admin/tag/index.vue"),
  },

];


export const blogRoutes: RouteRecordRaw[] = [

  {
    path: "home", name: "home",
    meta: { title: "Home", icon: "menu" },
    component: () => import("@/views/home/index.vue"),
  },


];

const routes: RouteRecordRaw[] = [
  {
    path: "/", name: "blog", redirect: { name: "home" },
    component: Blog, children: blogRoutes
  },
  {
    path: "/admin", name: "admin", redirect: { name: "article" },
    component: Admin, children: adminRoutes,
    beforeEnter(to, from, next) {
      userInfo();
      next();
    }
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