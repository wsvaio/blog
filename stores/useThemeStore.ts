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
		type: "dark" as "light" | "dark" | "",
		common: {
			// primaryColor: "#CD3636",
			primaryColor: "#211F46",
			secondaryColor: "#F17B7C",
			infoColor: "#096dd9",
			successColor: "#1CAE74",
			warningColor: "#faad14",
			errorColor: "#f5222d",

			spacingXxs: "4px",
			spacingXs: "8px",
			spacingSm: "12px",
			spacingMd: "16px",
			spacingLg: "24px",
			spacingXl: "32px",
			spacingXxl: "48px",

			spacing: "var(--spacing-md)",

			fontSizeXxl: "32px",
			fontSizeXl: "24px",
			fontSizeLg: "18px",
			fontSizeMd: "16px",
			fontSizeSm: "14px",
			fontSizeXs: "12px",
			fontSizeXxs: "8px",

			xxl: "1440px",
			xl: "1280px",
			lg: "960px",
			md: "768px",
			sm: "574px",
			xs: "375px",
			xxs: "256px",

			maxWidth: "1400px",
		},

		...generateThemeColor({
			mixColor: { light: "", dark: "" },
			// themeColor: { light: "#E1E5EA", dark: "#181818" },
			// bgColor: "var(--theme-color)",
			// textColor: { light: "#85709C", dark: "#dddddd" },
			// borderColor: { light: "#B8CAD8", dark: "#bbbbbb" },

			themeColor: { light: "#E1E5EA", dark: "#241F21" },
			bgColor: { light: "#E1E5EA", dark: "#241F21" },
			textColor: { light: "#85709C", dark: "#E3D2AC" },
			borderColor: { light: "#B8CAD8", dark: "#CFBF8B" },
		}),
		overwrite: {},
	}),
	actions: {},
	getters: {
		vars(): Record<any, any> {
			return {
				...this.common,
				...generateColor(
					[
						["primaryColor", this.common.primaryColor],
						["secondaryColor", this.common.secondaryColor],
						["infoColor", this.common.infoColor],
						["successColor", this.common.successColor],
						["warningColor", this.common.warningColor],
						["errorColor", this.common.errorColor],
						["themeColor", this[this.type || "light"].themeColor],
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
