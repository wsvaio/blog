<script setup lang="ts"></script>

<template>
  <button class="button">
    <slot />
    <div class="hoverEffect">
      <div />
    </div>
  </button>
</template>

<style lang="less" scoped>
@keyframes effect {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.button {
  display: inline-flex;
  position: relative;
  z-index: 0;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  overflow: hidden;
  transition: all 0.02s;
  border: 0;
  border-radius: 10rem;
  box-shadow: 0 0 7px -5px rgb(0 0 0 / 50%);
  color: rgb(37 37 37);
  font-weight: bold;
  cursor: pointer;
}

.button:hover {
  background: rgb(193 228 248);
  color: rgb(33 0 85);
}

.button:active {
  transform: scale(0.97);
}

/* stylelint-disable-next-line selector-class-pattern */
.hoverEffect {
  display: flex;
  position: absolute;
  z-index: 1;
  inset: 0;
  align-items: center;
  justify-content: center;
}
/* stylelint-disable-next-line selector-class-pattern */
.hoverEffect div {
  width: 10rem;
  height: 10rem;
  transition: 0.4s;
  animation: effect infinite 3s linear;
  border-radius: 40rem;
  opacity: 0.5;
  background: rgb(222 0 75);
  background: linear-gradient(90deg, rgb(222 0 75 / 100%) 0%, rgb(191 70 255 / 100%) 49%, rgb(0 212 255 / 100%) 100%);
  filter: blur(20px);
}
/* stylelint-disable-next-line selector-class-pattern */
.button:hover .hoverEffect div {
  width: 8rem;
  height: 8rem;
}
</style>
