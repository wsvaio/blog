import { createEventBus } from "wsvaio";

export const EventBus = createEventBus();

export const changeMode = () => {
  document.querySelector("body")?.classList.toggle("black");
};