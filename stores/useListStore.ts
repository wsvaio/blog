import { defineStore } from "pinia";

const wapper = <K extends string, T extends any[]>(
	key: K,
	service: () => Promise<T>
): {
	[Key in `${K}s`]: T;
} & { [Key in `$${K}s`]: (force?: boolean) => T } => {
	let t = false;
	return {
		[`${key}s`]: [] as unknown as T,
		[`$${key}s`](force = false) {
			if ((this[`${key}s`].length == 0 && !t) || force) {
				t = !!service()
					.then(data => {
						this[`${key}s`] = data;
					})
					.finally(() => (t = false));
			}
			return this[`${key}s`] as T;
		},
	} as any;
};

export default defineStore("list", () => ({
	...wapper("tag", () => $fetch<any[]>("/api/tag")),
	...wapper("type", () => $fetch<any[]>("/api/type")),
	...wapper("article", () => $fetch<any[]>("/api/article", { query: { select: { content: false } } })),

}));
