import { defineStore } from "pinia";



export default defineStore("admin", {
  state() {
    return {

    };
  },
  actions: {


  },
  getters: {


    // 管理员不能查看的页面
    exclude(): string[] {
      return [];
    },
    // 管理员能查看的页面
    include(): string[] {
      return [];
    }


  }
});