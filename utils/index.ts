export const log = console.log;
export const { format: formatNumber } = Intl.NumberFormat("en-GB", {
	notation: "compact",
	maximumFractionDigits: 1,
});

/**
 * 识别给定图像的主题颜色，返回 RGBA 值的平均值。
 *
 * @param imgUrl 要识别的图像的 URL。
 * @returns 包含 RGBA 值平均值的数组，顺序为 [R, G, B, A]。
 */
export async function identifySubject(imgUrl: string): Promise<[number, number, number, number]> {
	// const blob = await fetch(imgUrl, { cache: "no-cache" }).then(data => data.blob());
	// const src = URL.createObjectURL(blob);
	return new Promise(resolve => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d")!;
		const img = new Image();
		img.onload = () => {
			canvas.width = img.height;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			const { data } = ctx.getImageData(0, 0, img.width, img.height);
			const rgbas: [number, number, number, number][] = [];
			for (let i = 0; i < data.length; i += 4) rgbas.push([data[i], data[i + 1], data[i + 2], data[i + 3]]);
			const result: [number, number, number, number] = [0, 0, 0, 0];
			for (const [r, g, b, a] of rgbas) {
				result[0] += r;
				result[1] += g;
				result[2] += b;
				result[3] += a;
			}
			result[0] /= rgbas.length;
			result[1] /= rgbas.length;
			result[2] /= rgbas.length;
			result[3] = result[3] / rgbas.length / 255;
			resolve(result);
		};
		// img.onended = () => URL.revokeObjectURL(src);
		img.crossOrigin = "";
		img.src = imgUrl;

		// img.setAttribute("crossOrigin", "Anonymous");
	});
}

export const toFileUrl = (id: string) => `/api/file/${id}`;

export const resolveArticleTitles = <T extends Element>(doc: T) => {
	const titles: {
		el: HTMLElement;
	}[] = [];

	doc.childNodes.forEach(e => {
		if (/h\d/i.test(e.nodeName)) {
			titles.push({
				el: e as HTMLElement,
			});
		}
	});

	return titles;
};

export const resolveArticleTitlesToTree = <T extends Element>(doc: T) => {
	interface Title {
		el: HTMLElement;
		children: Title[];
	}

	const titles = resolveArticleTitles(doc);

	const r = (list: { el: HTMLElement }[]) => {
		const result: Title[] = [];
		const min = Math.min(...list.map(item => +item.el.nodeName.slice(1)));
		for (const item of list.filter(item => +item.el.nodeName.slice(1) === min)) {
			const start = list.indexOf(item) + 1;
			const end = list.slice(start).findIndex(sub => sub.el.nodeName == item.el.nodeName);
			result.push({
				el: item.el,
				children: r(list.slice(start, end == -1 ? list.length : end)),
			});
		}
		return result;
	};

	return r(titles);
};

/**
 * 递归遍历映射数组
 * @param list - 要遍历的数组或对象树。
 * @param handle - 对每个元素执行的操作函数。
 * @returns 一个新的数组或对象树。
 */
export const map = <T extends Record<any, any>, R extends Record<any, any>>(
	list: T[],
	handle: (item: T) => R,
	{ childrenKey } = { childrenKey: "children" }
) => {
	if (!list?.length) return [];
	const result = [] as R[];
	for (const item of list) {
		const handled = handle(item);
		if (Array.isArray(handled?.[childrenKey]) || Array.isArray(item?.[childrenKey]))
		// @ts-expect-error pass
			handled[childrenKey] = map(handled?.[childrenKey] || item?.[childrenKey], handle, { childrenKey });
		result.push(handled as unknown as R);
	}
	return result;
};

export const emojis = [
	"😀",
	"😃",
	"😄",
	"😁",
	"😆",
	"😅",
	"🤣",
	"😂",
	"🙂",
	"🙃",
	"😉",
	"😊",
	"😇",
	"🥰",
	"😍",
	"🤩",
	"😘",
	"😗",
	"😚",
	"😙",
	"😋",
	"😛",
	"😜",
	"🤪",
	"😝",
	"🤑",
	"🤗",
	"🤭",
	"🤫",
	"🤔",
	"🤐",
	"🤨",
	"😐",
	"😑",
	"😶",
	"😏",
	"😒",
	"🙄",
	"😬",
	"🤥",
	"😌",
	"😔",
	"😪",
	"🤤",
	"😴",
	"😷",
	"🤒",
	"🤕",
	"🤢",
	"🤮",
	"🤧",
	"🥵",
	"🥶",
	"🥴",
	"😵",
	"🤯",
	"🤠",
	"🥳",
	"😎",
	"🤓",
	"🧐",
	"😕",
	"😟",
	"🙁",
	"☹️",
	"😮",
	"😯",
	"😲",
	"😳",
	"🥺",
	"😦",
	"😧",
	"😨",
	"😰",
	"😥",
	"😢",
	"😭",
	"😱",
	"😖",
	"😣",
	"😞",
	"😓",
	"😩",
	"😫",
	"🥱",
	"😤",
	"😡",
	"😠",
	"🤬",
	"😈",
	"👿",
	"💀",
	"☠️",
	"💩",
	"🤡",
	"👹",
	"👺",
	"👻",
	"👽",
	"👾",
	"🤖",
	"😺",
	"😸",
	"😹",
	"😻",
	"😼",
	"😽",
	"🙀",
	"😿",
	"😾",
	"🙈",
	"🙉",
	"🙊",
	"💋",
	"💌",
	"💘",
	"💝",
	"💖",
	"💗",
	"💓",
	"💞",
	"💕",
	"💟",
	"❣️",
	"💔",
	"❤️",
	"🧡",
	"💛",
	"💚",
	"💙",
	"💜",
	"🤎",
	"🖤",
	"🤍",
	"💯",
	"💢",
	"💥",
	"💫",
	"💦",
	"💨",
	"🕳️",
	"💣",
	"💬",
	"👁️‍🗨️",
	"🗨️",
	"🗯️",
	"💭",
	"💤",
];
