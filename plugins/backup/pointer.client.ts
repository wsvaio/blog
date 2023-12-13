import "./pointer.less";

export default defineNuxtPlugin(() => {
	const pointer1 = document.createElement("div");
	pointer1.classList.add("pointer1");
	const pointer2 = document.createElement("div");
	pointer2.classList.add("pointer2");
	document.body.append(pointer1, pointer2);
	document.body.style.cursor = "none";

	window.addEventListener("mousemove", e => {
		window.requestAnimationFrame(() => {
			pointer1.style.left = pointer2.style.left = `${e.clientX}px`;
			pointer1.style.top = pointer2.style.top = `${e.clientY}px`;
		});
	});
});
