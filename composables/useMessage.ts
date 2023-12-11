import "./use-message.less";

export default () => {
	const isMounted = $(useMounted());

	const show = (message: string) => {
		if (isMounted) {
			const div = document.createElement("div");
			div.innerText = message;
			div.classList.add("use-message", "font-sans");
			document.body.appendChild(div);

			setTimeout(() => {
				document.body.removeChild(div);
			}, 2000);
		}
	};

	return {

		show
	};
};
