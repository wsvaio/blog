export const log = console.log;
/**
 * 识别给定图像的主题颜色，返回 RGBA 值的平均值。
 *
 * @param imgUrl 要识别的图像的 URL。
 * @returns 包含 RGBA 值平均值的数组，顺序为 [R, G, B, A]。
 */
export async function identifySubject(imgUrl: string): Promise<[number, number, number, number]> {
  // const blob = await fetch(imgUrl, { cache: "no-cache" }).then(data => data.blob());
  // const src = URL.createObjectURL(blob);
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.height;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, img.width, img.height);
      const rgbas: [number, number, number, number][] = [];
      for (let i = 0; i < data.length; i += 4)
        // @ts-ignore
        rgbas.push([data[i], data[i + 1], data[i + 2], data[i + 3]]);
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

export function resolveArticleTitles<T extends Element>(doc: T) {
  const titles: {
    el: HTMLElement;
  }[] = [];

  doc.childNodes.forEach((e) => {
    if (/h\d/i.test(e.nodeName)) {
      titles.push({
        el: e as HTMLElement,
      });
    }
  });

  return titles;
}

export function resolveArticleTitlesToTree<T extends Element>(doc: T) {
  interface Title {
    el: HTMLElement;
    children: Title[];
  }

  const titles = resolveArticleTitles(doc);

  const r = (list: { el: HTMLElement }[]) => {
    const result: Title[] = [];
    const min = Math.min(...list.map((item) => +item.el.nodeName.slice(1)));
    for (const item of list.filter((item) => +item.el.nodeName.slice(1) === min)) {
      const start = list.indexOf(item) + 1;
      const end = list.slice(start).findIndex((sub) => sub.el.nodeName == item.el.nodeName);
      result.push({
        el: item.el,
        children: r(list.slice(start, end == -1 ? list.length : end)),
      });
    }
    return result;
  };

  return r(titles);
}

/**
 * 递归遍历映射数组
 * @param list - 要遍历的数组或对象树。
 * @param handle - 对每个元素执行的操作函数。
 * @returns 一个新的数组或对象树。
 */
export function map<T extends Record<any, any>, R extends Record<any, any>>(
  list: T[],
  handle: (item: T) => R,
  { childrenKey } = { childrenKey: "children" },
) {
  if (!list?.length) return [];
  const result = [] as R[];
  for (const item of list) {
    const handled = handle(item);
    if (Array.isArray(handled?.[childrenKey]) || Array.isArray(item?.[childrenKey]))
      // @ts-expect-error pass
      handled[childrenKey] = map(handled?.[childrenKey] || item?.[childrenKey], handle, {
        childrenKey,
      });
    result.push(handled as unknown as R);
  }
  return result;
}

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

/**
 * 预加载图片并返回Promise
 * @param url 图片URL
 * @returns Promise<HTMLImageElement> 加载完成的图片对象
 */
export function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
}

// 名言
export const famousQuotes = [
  "穷且益坚，不坠青云之志。 —— [唐] 王勃 《滕王阁序》",
  "出淤泥而不染，濯清涟而不妖。 —— [宋] 周敦颐 《爱莲说》",
  "纸上得来终觉浅，绝知此事要躬行。 —— [宋] 陆游 《冬夜读书示子聿》",
  "曾经沧海难为水，除却巫山不是云。 —— [唐] 元稹 《离思》",
  "盛年不重来，一日难再晨。及时当勉励，岁月不待人。 —— [晋] 陶渊明 《杂诗》",
  "海内存知己，天涯若比邻。 —— [唐] 王勃 《送杜少府之任蜀州》",
  "先天下之忧而忧，后天下之乐而乐。 —— [宋] 范仲淹 《岳阳楼记》",
  "问渠那得清如许？为有源头活水来。 —— [宋] 朱熹 《观书有感》",
  "千淘万漉虽辛苦，吹尽狂沙始到金。 —— [唐] 刘禹锡 《浪淘沙》",
  "位卑未敢忘忧国，事定犹须待阖棺。 —— [宋] 陆游 《病起书怀》",
  "路漫漫其修远兮，吾将上下而求索。 —— [战国] 屈原 《离骚》",
  "长风破浪会有时，直挂云帆济沧海。 —— [唐] 李白 《行路难》",
  "天生我材必有用，千金散尽还复来。 —— [唐] 李白 《将进酒》",
  "安得广厦千万间，大庇天下寒士俱欢颜。 —— [唐] 杜甫 《茅屋为秋风所破歌》",
  "沉舟侧畔千帆过，病树前头万木春。 —— [唐] 刘禹锡 《酬乐天扬州初逢席上见赠》",
  "山重水复疑无路，柳暗花明又一村。 —— [宋] 陆游 《游山西村》",
  "会当凌绝顶，一览众山小。 —— [唐] 杜甫 《望岳》",
  "欲穷千里目，更上一层楼。 —— [唐] 王之涣 《登鹳雀楼》",
  "不识庐山真面目，只缘身在此山中。 —— [宋] 苏轼 《题西林壁》",
  "此情可待成追忆，只是当时已惘然。 —— [唐] 李商隐 《锦瑟》",
  "两情若是久长时，又岂在朝朝暮暮。 —— [宋] 秦观 《鹊桥仙》",
  "人生自古谁无死？留取丹心照汗青。 —— [宋] 文天祥 《过零丁洋》",
  "黄沙百战穿金甲，不破楼兰终不还。 —— [唐] 王昌龄 《从军行》",
  "莫愁前路无知己，天下谁人不识君。 —— [唐] 高适 《别董大》",
  "业精于勤，荒于嬉；行成于思，毁于随。 —— [唐] 韩愈 《进学解》",
  "博观而约取，厚积而薄发。 —— [宋] 苏轼 《稼说送张琥》",
  "不是一番寒彻骨，怎得梅花扑鼻香。 —— [元] 高明 《琵琶记》",
  "落霞与孤鹜齐飞，秋水共长天一色。 —— [唐] 王勃 《滕王阁序》",
  "大漠孤烟直，长河落日圆。 —— [唐] 王维 《使至塞上》",
  "明月几时有？把酒问青天。 —— [宋] 苏轼 《水调歌头》",
  "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。 —— [宋] 李清照 《声声慢》",
  "昨夜西风凋碧树，独上高楼，望尽天涯路。 —— [宋] 晏殊 《蝶恋花》",
  "衣带渐宽终不悔，为伊消得人憔悴。 —— [宋] 柳永 《蝶恋花》",
  "众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。 —— [宋] 辛弃疾 《青玉案·元夕》",
  "人面不知何处去，桃花依旧笑春风。 —— [唐] 崔护 《题都城南庄》",
  "同是天涯沦落人，相逢何必曾相识。 —— [唐] 白居易 《琵琶行》",
  "晴空一鹤排云上，便引诗情到碧霄。 —— [唐] 刘禹锡 《秋词》",
  "春蚕到死丝方尽，蜡炬成灰泪始干。 —— [唐] 李商隐 《无题》",
  "身无彩凤双飞翼，心有灵犀一点通。 —— [唐] 李商隐 《无题》",
  "老骥伏枥，志在千里。烈士暮年，壮心不已。 —— [三国] 曹操 《龟虽寿》",
  "采菊东篱下，悠然见南山。 —— [晋] 陶渊明 《饮酒》",
  "无边落木萧萧下，不尽长江滚滚来。 —— [唐] 杜甫 《登高》",
  "劝君莫惜金缕衣，劝君惜取少年时。 —— [唐] 杜秋娘 《金缕衣》",
  "宝剑锋从磨砺出，梅花香自苦寒来。 —— [明] 冯梦龙 《警世通言》",
  "良药苦口利于病，忠言逆耳利于行。 —— [汉] 司马迁 《史记》",
  "勿以恶小而为之，勿以善小而不为。 —— [三国] 刘备 《遗诏敕后主》",
  "读书破万卷，下笔如有神。 —— [唐] 杜甫 《奉赠韦左丞丈二十二韵》",
  "我自横刀向天笑，去留肝胆两昆仑。 —— [清] 谭嗣同 《狱中题壁》",
  "横眉冷对千夫指，俯首甘为孺子牛。 —— [近现代] 鲁迅 《自嘲》",
  "世上本没有路，走的人多了，也便成了路。 —— [近现代] 鲁迅 《故乡》",
  "成功的花，人们只惊羡她现时的明艳！然而当初她的芽儿，浸透了奋斗的泪泉。 —— [近现代] 冰心 《繁星·春水》",
  "黑夜给了我黑色的眼睛，我却用它寻找光明。 —— [当代] 顾城 《一代人》",
  "面朝大海，春暖花开。 —— [当代] 海子 《面朝大海，春暖花开》",
  "卑鄙是卑鄙者的通行证，高尚是高尚者的墓志铭。 —— [当代] 北岛 《回答》",
  "认识你自己。 —— [古希腊] 苏格拉底",
  "我只知道一件事，就是我无知。 —— [古希腊] 苏格拉底",
  "人是万物的尺度。 —— [古希腊] 普罗泰戈拉",
  "吾爱吾师，吾更爱真理。 —— [古希腊] 亚里士多德",
  "活着不是目的，好好活着才是。 —— [古希腊] 苏格拉底",
  "耐心是一切聪明才智的基础。 —— [古希腊] 柏拉图",
  "理想是指路明灯。没有理想，就没有坚定的方向。 —— [俄] 列夫·托尔斯泰",
  "幸福的家庭都是相似的，不幸的家庭各有各的不幸。 —— [俄] 列夫·托尔斯泰 《安娜·卡列尼娜》",
  "不要为结束而哭泣，要为曾经发生过而微笑。 —— [俄] 谢尔盖·耶塞宁",
  "书籍是造就灵魂的工具。 —— [法] 维克多·雨果",
  "世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的心灵。 —— [法] 维克多·雨果 《悲惨世界》",
  "人的心只容得下一定程度的绝望，海绵已经吸够了水，即使大海从它上面流过，也不能再给它增添一滴水了。 —— [法] 维克多·雨果 《巴黎圣母院》",
  "生活中不是缺少美，而是缺少发现美的眼睛。 —— [法] 罗丹",
  "人的一生是短的，但如果卑劣地过这短的一生，就太长了。 —— [英] 莎士比亚",
  "生存还是毁灭，这是一个值得考虑的问题。 —— [英] 莎士比亚 《哈姆雷特》",
  "在时间的大钟上，只有两个字「现在」。 —— [英] 莎士比亚",
  "知识就是力量。 —— [英] 弗兰西斯·培根",
  "读史使人明智，读诗使人灵秀，数学使人周密，科学使人深刻。 —— [英] 弗兰西斯·培根",
  "冬天来了，春天还会远吗？ —— [英] 雪莱 《西风颂》",
  "如果冬天来了，春天还会远吗？ —— [英] 雪莱 《西风颂》",
  "凡是我放得下的，别人拿得走。凡是属于我的，别人拿不走。 —— [英] 萨克雷",
  "傲慢让别人无法来爱我，偏见让我无法去爱别人。 —— [英] 简·奥斯汀 《傲慢与偏见》",
  "失败是成功之母。 —— [英] 威廉·乔治·乔丹",
  "如果你年轻时没有学会思考，那就永远学不会思考。 —— [美] 爱迪生",
  "天才就是1%的灵感加上99%的汗水。 —— [美] 爱迪生",
  "不要问你的国家能为你做什么，要问你能为你的国家做什么。 —— [美] 肯尼迪",
  "我们唯一需要恐惧的就是恐惧本身。 —— [美] 富兰克林·罗斯福",
  "有的人活着，他已经死了；有的人死了，他还活着。 —— [当代] 臧克家 《有的人》",
  "生活就像海洋，只有意志坚强的人，才能到达彼岸。 —— [德] 马克思",
  "实践是检验真理的唯一标准。 —— [现代] 中国谚语 (后经胡福明等人文章普及)",
  "星星之火，可以燎原。 —— [当代] 毛泽东",
  "不到长城非好汉。 —— [当代] 毛泽东 《清平乐·六盘山》",
  "一万年太久，只争朝夕。 —— [当代] 毛泽东 《满江红·和郭沫若同志》",
  "真理不在蒙满灰尘的权威著作中，而是在宇宙、自然界这本大书中。 —— [意] 伽利略",
  "给我一个支点，我就能撬起整个地球。 —— [古希腊] 阿基米德",
  "想象力比知识更重要。 —— [美] 爱因斯坦",
  "不要努力成为一个成功者，要努力成为一个有价值的人。 —— [美] 爱因斯坦",
  "把你的手放在滚热的炉子上一分钟，感觉起来像一小时。坐在一个漂亮姑娘身边一小时，感觉起来像一分钟。这就是相对论。 —— [美] 爱因斯坦",
  "成功是从失败到失败而不丧失热情。 —— [英] 温斯顿·丘吉尔",
  "如果你对每只向你吠的狗都停下来扔石头，你永远也到不了目的地。 —— [英] 温斯顿·丘吉尔",
  "历史是由胜利者书写的。 —— [英] 温斯顿·丘吉尔 (常被引用，出处略有争议)",
  "有志者，事竟成。 —— [南朝] 范晔 《后汉书》",
  "鞠躬尽瘁，死而后已。 —— [三国] 诸葛亮 《后出师表》",
  "非淡泊无以明志，非宁静无以致远。 —— [三国] 诸葛亮 《诫子书》",
  "天行健，君子以自强不息；地势坤，君子以厚德载物。 —— [周] 《周易》",
  "学而不思则罔，思而不学则殆。 —— [春秋] 孔子 《论语》",
  "三人行，必有我师焉。择其善者而从之，其不善者而改之。 —— [春秋] 孔子 《论语》",
  "己所不欲，勿施于人。 —— [春秋] 孔子 《论语》",
];
export const randomQuote = () => famousQuotes[Math.floor(Math.random() * famousQuotes.length)];

export { default as defaultAvatarUrl } from "@/assets/img/article.jpg";

export const randomImageUrl = () => `https://www.dmoe.cc/random.php?key=${Math.random()}`;
