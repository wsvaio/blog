import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";


export default defineStore("main", {
  state() {
    return {
      // 要缓存的路由 因为要支持tab拖动 所以是个一列表
      keepAlive: [] as RouteLocationNormalized[],

    };
  },
  actions: {
    addKeepAlive(route: RouteLocationNormalized) {
      const children = route.matched.find(item => item.name == route.name)?.children || [];
      if (this.keepAlive.find(item => item.name == route.name) // 已存在
        || route.matched[0].name != "admin" // 不是default子路由
        || children.length > 0
      ) return;


      this.keepAlive.push(route);
    }


  },
  getters: {
    // 要缓存的路由名
    nameList(): string[] {
      return ["keep-alive", ...this.keepAlive.map(item => String(item.name))];
    }

  }
});