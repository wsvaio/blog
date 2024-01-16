<script setup lang="ts"></script>

<template>
  <div class="global-loading">
    <div class="planet" />
  </div>
</template>

<style lang="less">
@media (prefers-color-scheme: dark) {
  .global-loading {
    background-color: #101014 !important;
  }
}

.global-loading {
  @keyframes rings1 {
    0% {
      transform: rotateX(65deg) rotateZ(0deg) scale(1.75);
    }

    100% {
      transform: rotateX(65deg) rotateZ(360deg) scale(1.75);
    }
  }

  @keyframes rings2 {
    0% {
      transform: rotateX(65deg) rotateZ(0deg) scale(1.7);
    }

    100% {
      transform: rotateX(65deg) rotateZ(360deg) scale(1.7);
    }
  }

  display: flex;
  position: fixed;
  z-index: 9000;
  align-items: center;
  justify-content: center;
  inset: 0;
  background-color: white;

  .planet {
    display: block;
    position: relative;
    width: 125px;
    height: 125px;
    transform: rotateZ(-15deg);
    transform-style: preserve-3d;
    border-radius: 50%;
    background: #fcc96b;
    background: linear-gradient(
      180deg,
      #fcc96b 0%,
      #fcc96b 15%,
      #f7ae01 15%,
      #f7ae01 19%,
      #fcc96b 19%,
      #fcc96b 22%,
      #f7ae01 22%,
      #f7ae01 28%,
      #fcc96b 28%,
      #fcc96b 31%,
      #fcc96b 33%,
      #fcc96b 36%,
      #f7ae01 36%,
      #f7ae01 48%,
      #fcc96b 48%,
      #fcc96b 55%,
      #f7ae01 55%,
      #f7ae01 66%,
      #fcc96b 66%,
      #fcc96b 70%,
      #f7ae01 70%,
      #f7ae01 73%,
      #fcc96b 73%,
      #fcc96b 82%,
      #f7ae01 82%,
      #c7ba9d 86%,
      #fcc96b 86%
    );
    box-shadow: inset 0 0 25px rgb(0 0 0 / 25%), inset 8px -4px 6px rgb(199 128 0 / 50%),
      inset -8px 4px 8px rgb(255 235 199 / 50%), inset 20px -5px 12px #f7ae01, 0 0 100px #ffffff59;
  }

  .planet::before {
    content: "";
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    animation: rings1 0.8s infinite linear;
    border: 16px solid #e1a519;
    border-top-width: 0;
    border-radius: 50%;
    box-shadow: 0 -2px 0 #c18620;
  }

  .planet::after {
    content: "";
    display: block;
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    animation: rings2 0.8s infinite linear;
    border: 8px solid #d48b0c;
    border-top-width: 0;
    border-radius: 50%;
    box-shadow: 0 -2px 0 #b99309;
  }
}
</style>
