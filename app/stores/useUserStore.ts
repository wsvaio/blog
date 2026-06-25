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
  persist: {
    storage: {
      setItem(key, value) {
        const state = JSON.parse(value);
        if (state.persist) {
          localStorage.setItem(key, value);
        } else {
          localStorage.setItem(
            key,
            JSON.stringify({
              persist: state.persist,
            }),
          );
        }
      },
      getItem(key) {
        return localStorage.getItem(key);
      },
    },
  },
});
