<script setup lang="ts">
const buttonRef = $ref<HTMLButtonElement>();
const buttonRefStyle = reactive<Record<any, any>>({});
useEventListener($$(buttonRef), "mousemove", e => {
	const boundingClientRect = buttonRef?.getBoundingClientRect();
	if (!boundingClientRect || !buttonRef) return;
	const x = e.clientX - boundingClientRect.left;
	const y = e.clientY - boundingClientRect.top;

	const xc = boundingClientRect.width / 2;
	const yc = boundingClientRect.height / 2;

	const dx = x - xc;
	const dy = y - yc;

	buttonRefStyle["--rx"] = `${dy / -1}deg`;
	buttonRefStyle["--ry"] = `${dx / 10}deg`;
});
useEventListener($$(buttonRef), "mouseleave", () => {
	buttonRefStyle["--ty"] = "0";
	buttonRefStyle["--rx"] = "0";
	buttonRefStyle["--ry"] = "0";
});

useEventListener($$(buttonRef), "mousedown", () => {
	buttonRefStyle["--tz"] = "-25px";
});

useEventListener("mouseup", () => {
	buttonRefStyle["--tz"] = "-12px";
});
</script>

<template>
	<button ref="buttonRef" class="awesome-button" :style="buttonRefStyle">
		<div class="content"><slot /></div>
	</button>
</template>

<style lang="less">
.awesome-button {
  display: inline-block;
  position: relative;
  padding: .5em 1em;
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0)) translateZ(var(--tz, -12px));
    transition: box-shadow 0.5s ease, transform 0.2s ease;
    border-radius: 4px;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
    will-change: transform;
  }

  &:hover::before {
    box-shadow: 0 5px 15px rgb(0 0 0 / 30%);
  }

  & > .content {
    display: inline-block;
    position: relative;
    transform: translateY(var(--ty, 0)) rotateX(var(--rx, 0)) rotateY(var(--ry, 0));
    transition: transform 0.2s ease;
    font-weight: bold;
    letter-spacing: 0.01em;
    will-change: transform;
  }
}
</style>
