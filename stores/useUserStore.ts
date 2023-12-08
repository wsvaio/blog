import { defineStore } from "pinia";

export default defineStore("user", {
	state: () => ({
		id: "",
		avatar: "",
		name: "",
		email: "",
		site: "",
		createAt: "",
		updateAt: "",
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
	},
	getters: {},
	persist: true,
});
