import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import mixPlugin from "colord/plugins/mix";
import type { HsvColor } from "colord";

extend([namesPlugin, mixPlugin]);

/** 色相阶梯 */
const hueStep = 2;
/** 饱和度阶梯，浅色部分 */
const saturationStep = 16;
/** 饱和度阶梯，深色部分 */
const saturationStep2 = 5;
/** 亮度阶梯，浅色部分 */
const brightnessStep1 = 5;
/** 亮度阶梯，深色部分 */
const brightnessStep2 = 15;
/** 浅色数量，主色上 */
const lightColorCount = 5;
/** 深色数量，主色下 */
const darkColorCount = 4;

/**
 * 调色板的颜色索引
 * @description 从左至右颜色从浅到深，6为主色号
 */
type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** 暗色主题颜色映射关系表 */
// const darkColorMap = [
// 	{ index: 10, opacity: 0.15 },
// 	{ index: 9, opacity: 0.25 },
// 	{ index: 8, opacity: 0.3 },
// 	{ index: 7, opacity: 0.45 },
// 	{ index: 6, opacity: 0.65 },
// 	{ index: 5, opacity: 0.85 },
// 	{ index: 4, opacity: 0.9 },
// 	{ index: 3, opacity: 0.95 },
// 	{ index: 2, opacity: 0.97 },
// 	{ index: 1, opacity: 0.98 },
// ];
const darkColorMap = [
	{ index: 1, opacity: 0.15 },
	{ index: 2, opacity: 0.25 },
	{ index: 3, opacity: 0.3 },
	{ index: 4, opacity: 0.45 },
	{ index: 5, opacity: 0.65 },
	{ index: 6, opacity: 0.85 },
	{ index: 7, opacity: 0.9 },
	{ index: 8, opacity: 0.95 },
	{ index: 9, opacity: 0.97 },
	{ index: 10, opacity: 0.98 },
];

/**
 * 获取色相渐变
 * @param hsv - hsv格式颜色值
 * @param i - 与6的相对距离
 * @param isLight - 是否是亮颜色
 */
function getHue(hsv: HsvColor, i: number, isLight: boolean) {
	let hue: number;

	const hsvH = Math.round(hsv.h);

	if (hsvH >= 60 && hsvH <= 240) {
		// 冷色调
		// 减淡变亮 色相顺时针旋转 更暖
		// 加深变暗 色相逆时针旋转 更冷
		hue = isLight ? hsvH - hueStep * i : hsvH + hueStep * i;
	}
	else {
		// 暖色调
		// 减淡变亮 色相逆时针旋转 更暖
		// 加深变暗 色相顺时针旋转 更冷
		hue = isLight ? hsvH + hueStep * i : hsvH - hueStep * i;
	}

	if (hue < 0) hue += 360;

	if (hue >= 360) hue -= 360;

	return hue;
}

/**
 * 获取饱和度渐变
 * @param hsv - hsv格式颜色值
 * @param i - 与6的相对距离
 * @param isLight - 是否是亮颜色
 */
function getSaturation(hsv: HsvColor, i: number, isLight: boolean) {
	// 灰色不渐变
	if (hsv.h === 0 && hsv.s === 0) return hsv.s;

	let saturation: number;

	if (isLight) saturation = hsv.s - saturationStep * i;
	else if (i === darkColorCount) saturation = hsv.s + saturationStep;
	else saturation = hsv.s + saturationStep2 * i;

	if (saturation > 100) saturation = 100;

	if (isLight && i === lightColorCount && saturation > 10) saturation = 10;

	if (saturation < 6) saturation = 6;

	return saturation;
}

/**
 * 获取明度渐变
 * @param hsv - hsv格式颜色值
 * @param i - 与6的相对距离
 * @param isLight - 是否是亮颜色
 */
function getValue(hsv: HsvColor, i: number, isLight: boolean) {
	let value: number;

	if (isLight) value = hsv.v + brightnessStep1 * i;
	else value = hsv.v - brightnessStep2 * i;

	if (value > 100) value = 100;

	return value;
}

/**
 * 根据颜色获取调色板颜色(从左至右颜色从浅到深，6为主色号)
 * @param color - 颜色
 * @param index - 调色板的对应的色号(6为主色号)
 * @returns 返回hex格式的颜色
 */
export function getColorPalette(color: string, index: ColorIndex, mixColor = ""): string {
	const transformColor = colord(color);

	if (!transformColor.isValid()) throw new Error("invalid input color value");

	if (index === 6) return colord(transformColor).toHex();

	const isLight = index < 6;
	const hsv = transformColor.toHsv();
	const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;

	const newHsv: HsvColor = {
		h: getHue(hsv, i, isLight),
		s: getSaturation(hsv, i, isLight),
		v: getValue(hsv, i, isLight),
	};

	return mixColor
		? colord(mixColor)
			.mix(colord(newHsv).toHex(), darkColorMap.find(item => item.index == index)?.opacity)
			.toHex()
		: colord(newHsv).toHex();
}

// 生成主题色
export const generateColor = <T extends string>(colors: [T, string][], mixColor = "") => {
	const actions = [
		["", (color: string) => color],
		["Suppl", (color: string) => color],
		["Hover", (color: string) => getColorPalette(color, 5, mixColor)],
		["Pressed", (color: string) => getColorPalette(color, 7, mixColor)],
		["Active", (color: string) => colord(color).alpha(0.1).toHex()],

		["1", (color: string) => getColorPalette(color, 1, mixColor)],
		["2", (color: string) => getColorPalette(color, 2, mixColor)],
		["3", (color: string) => getColorPalette(color, 3, mixColor)],
		["4", (color: string) => getColorPalette(color, 4, mixColor)],
		["5", (color: string) => getColorPalette(color, 5, mixColor)],
		["6", (color: string) => getColorPalette(color, 6, mixColor)],
		["7", (color: string) => getColorPalette(color, 7, mixColor)],
		["8", (color: string) => getColorPalette(color, 8, mixColor)],
		["9", (color: string) => getColorPalette(color, 9, mixColor)],
		["10", (color: string) => getColorPalette(color, 10, mixColor)],
	] as const;
  type Scene =
    | ""
    | "Suppl"
    | "Hover"
    | "Pressed"
    | "Active"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10";
  const result = {} as {
  	[key in `${T}${Scene}`]: string;
  };
  for (const [name, color] of colors) for (const [k, v] of actions) result[`${name}${k}`] = v(color);
  return result;
};
