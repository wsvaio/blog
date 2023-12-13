import { defineStore } from "pinia";

const generateThemeColor = <T extends string>(color: Record<T, { [K in "light" | "dark"]: string } | string>) => {
	const result: Record<any, any> = { dark: {}, light: {} };
	for (const [k, v] of Object.entries<any>(color))
		for (const key of ["dark", "light"]) result[key][k] = typeof v === "string" ? v : v[key];

	return result as {
		dark: {
			[K in T]: string;
		};
		light: {
			[K in T]: string;
		};
	};
};

export default defineStore("theme", {
	state: () => ({
		type: "light" as "light" | "dark" | "",
		common: {
			// primaryColor: "#CD3636",
			primaryColor: "#FF69B4",
			// secondaryColor: "#F17B7C",
			infoColor: "#096dd9",
			successColor: "#1CAE74",
			warningColor: "#faad14",
			errorColor: "#f5222d",

			fontSize: "16px",

			maxWidth: "1200px",
			headerHeight: "calc(48px + 1rem)",
		},

		...generateThemeColor({
			mixColor: { light: "", dark: "" },
			bgColor: { light: "rgba(255,255,255,0.9)", dark: "rgba(36,31,33,0.9)" },
			textColor: { light: "#343a40", dark: "#e9ecef" },
			borderColor: { light: "#e9ecef", dark: "#CFBF8B" },
		}),
		overwrite: {} as any,
	}),
	actions: {},
	getters: {
		vars(): Record<any, any> {
			return {
				...this.common,
				...generateColor(
					[
						["primaryColor", this.common.primaryColor],
						["infoColor", this.common.infoColor],
						["successColor", this.common.successColor],
						["warningColor", this.common.warningColor],
						["errorColor", this.common.errorColor],
						["bgColor", this[this.type || "light"].bgColor],
						["textColor", this[this.type || "light"].textColor],
						["borderColor", this[this.type || "light"].borderColor],
					],
					this[this.type || "light"].mixColor
				),
				...this[this.type || "light"],
				...this.overwrite,
			};
		},
	},
});
