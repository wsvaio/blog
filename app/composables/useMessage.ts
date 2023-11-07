import "./use-message.less";

type MessageType = "primary" | "success" | "warning" | "danger" | "info";

interface MessageOptions {
  type?: MessageType;
  duration?: number;
}

let activeCount = 0;
const GAP = 48;

export default () => {
  const show = (message: string, options: MessageOptions | MessageType = "primary") => {
    const { type = "primary", duration = 2500 } = typeof options === "string" ? { type: options } : options;
    const index = activeCount++;
    const top = 16 + index * GAP;

    const div = document.createElement("div");
    div.textContent = message;
    div.className = "use-message use-message--" + type + " font-sans";
    div.style.top = top + "px";
    div.style.setProperty("--duration", duration + "ms");
    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
      activeCount = Math.max(0, activeCount - 1);
    }, duration);
  };

  return {
    show,
    success: (message: string, duration?: number) => show(message, { type: "success", duration }),
    warning: (message: string, duration?: number) => show(message, { type: "warning", duration }),
    danger: (message: string, duration?: number) => show(message, { type: "danger", duration }),
    info: (message: string, duration?: number) => show(message, { type: "info", duration }),
  };
};
