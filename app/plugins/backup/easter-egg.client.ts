// const t = [
// 	"arrowup",
// 	"arrowup",
// 	"arrowdown",
// 	"arrowdown",
// 	"arrowleft",
// 	"arrowright",
// 	"arrowleft",
// 	"arrowright",
// 	"b",
// 	"a",
// 	"b",
// 	"a",
// ];

const t = ["w", "s", "v", "a", "i", "o"];

export default defineNuxtPlugin(() => {
  const message = useMessage();

  let i = 0;

  window.addEventListener("keydown", ev => {
    if (t.slice(i).indexOf(ev.key.toLowerCase()) == i - t.slice(0, i).length) i++;
    else i = 0;

    if (i == t.length) {
      message.show("🫪🫪🫪🫪🫪🫪🫪🫪");
      i = 0;
    }
  });
});
