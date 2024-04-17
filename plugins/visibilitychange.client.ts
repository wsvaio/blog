import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  let title = "";
  let timer: NodeJS.Timeout;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearTimeout(timer);
      title = document.title == "(*゜ロ゜)ノ被发现了~" ? title : document.title;
      document.title = "(つ ェ ⊂)我藏好了哦~";
    }
    else {
      document.title = "(*゜ロ゜)ノ被发现了~";
      timer = setTimeout(() => {
        document.title = title;
      }, 1000);
    }
  });
});
