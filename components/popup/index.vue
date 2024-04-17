<script setup lang='ts'>
const divRef = $ref<HTMLDivElement>();
let show = $ref(false);
useEventListener($$(divRef), "mouseenter", () => show = true);
useEventListener($$(divRef), "mouseleave", () => show = false);
</script>

<template>
  <div ref="divRef" class="popup">
    <transition name="fade">
      <div v-show="show" class="popuper">
        <slot name="popuper" />
      </div>
    </transition>
    <div class="trigger">
      <slot />
    </div>
  </div>
</template>

<style lang='less' scoped>
.popup {
  position: relative;

	&>.popuper {
		position: absolute;
		top: 0;
		left: 0%;
		transform: translate(0%, -100%);
	}

}
</style>
