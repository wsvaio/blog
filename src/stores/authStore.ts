import { defineStore } from "pinia";
import { merge } from "wsvaio";

const storageName = `${import.meta.env.VITE_PROJECT_NAME}_token`;

const trying = (fn: () => any) => {
  try { fn(); }
  catch (err) { console.warn(storageName, err); }
};

export default defineStore("auth", {
  state() {
    let result = {
      token: "",
      expire: 0
    };
    const storageAuth = localStorage.getItem(storageName);
    if (storageAuth) trying(() => merge(result, JSON.parse(storageAuth)));
    return result;
  },

  actions: {
    async login(body) {
      const data = await login({ body });
      merge(this.$state, data);
      // 持久化
      if (body.persist) {
        localStorage.setItem(storageName, JSON.stringify(this.$state));
      }
    },
    logout() {
      localStorage.removeItem(storageName);
      this.$reset();
    },
  },
  getters: {
    isLogin(): boolean {
      return Date.now() > this.expire;
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: storageName,
        storage: sessionStorage,
      }
    ],
  }

});