import { defineStore } from "pinia";

export default defineStore("user", {
	state: () => ({
		id: "",
		avatar: "",
		name: "",
		email: "",
		site: "",
		createAt: "",
		updateAt: ""
	}),
	actions: {

	},
	getters: {

	},

});
