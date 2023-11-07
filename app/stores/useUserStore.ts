import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    id: "",
    avatar: "",
    name: "",
    email: "",
    accept_emails: false,
    site: "",
    created_at: "",
    updated_at: "",
    token: "",

    persist: false,
  }),
  actions: {
    async refreshAvatar() {
      if (!/^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) return;
      const data = await $fetch<{ avatar: string }>(`/api/user/email/${this.email}`);
      this.$patch({ avatar: data.avatar });
    },
    async refresh() {
      if (!/^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) return;
      this.$patch(await $fetch(`/api/user/email/${this.email}`));
    },
    async upsert() {
      await $fetch(`/api/user/upsert`, { method: "POST", body: this.$state });
    },
  },
  getters: {},
  persist: [
    {
      includes: ["persist", "token"],
    },
    {
      excludes: ["persist", "token"],
      setter(key, value) {
        console.log(key, value, "asdjlfjasldfjlasdkjflasjdkf");
        if (this.persist) {
          localStorage.setItem(key, JSON.stringify(value));
          sessionStorage.removeItem(key);
        } else {
          sessionStorage.setItem(key, JSON.stringify(value));
          localStorage.removeItem(key);
        }
      },
      getter(key) {
        console.log(key, "asdjlfjasldfjlasdkjflasjdkf");
        if (this.persist) return JSON.parse(localStorage.getItem(key) || "null");
        else return JSON.parse(sessionStorage.getItem(key) || "null");
      },
    },
  ],
});
