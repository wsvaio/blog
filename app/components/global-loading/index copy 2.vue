<script setup lang="ts"></script>

<template>
  <div class="load">
    <div class="loading">
      <div class="loader__bar" />
      <div class="loader__bar loader__bar--delay-1" />
      <div class="loader__bar loader__bar--delay-2" />
      <div class="loader__bar loader__bar--delay-3" />
      <div class="loader__bar loader__bar--delay-4" />
      <div class="loader__bar loader__bar--delay-5" />
      <div />
    </div>
  </div>
</template>

<style lang="less" scoped>
.load {
  display: flex;
  position: fixed;
  z-index: 9000;
  align-items: center;
  justify-content: center;
  inset: 0;
}

@keyframes loader {
  0% {
    width: 0%;
    background: #ff8919;
  }

  20% {
    width: 100%;
  }

  39% {
    background: #ff8919;
  }

  40% {
    width: 0%;
    background: #ffa54f;
  }

  60% {
    width: 100%;
  }

  80% {
    width: 0%;
  }

  100% {
    width: 0%;
    background: #ffa54f;
  }
}

@keyframes loader-alt {
  0% {
    width: 100%;
    background: #ff7c00;
  }

  19% {
    background: #ff7c00;
  }

  20% {
    width: 0%;
    background: #ff9834;
  }

  40% {
    width: 100%;
  }

  59% {
    background: #ff9834;
  }

  60% {
    width: 0;
    background: #ff7c00;
  }

  80% {
    width: 100%;
  }

  100% {
    width: 100%;
    background: #ff7c00;
  }
}

.loading {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.loader__bar {
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
}

.loader__bar::before {
  content: "";
  width: 0%;
  height: 100%;
  animation: loader ease 8s infinite;
  animation-delay: 100ms;
  background: #ff7c00;
  background-size: 200% 200%;
}

.loader__bar::after {
  content: "";
  width: 100%;
  height: 100%;
  animation: loader-alt ease 8s infinite;
  animation-delay: 100ms;
  background: #ff7c00;
  background-size: 200% 200%;
}

.loader__bar--delay-1::before,
.loader__bar--delay-1::after {
  animation-delay: 200ms;
}

.loader__bar--delay-2::before,
.loader__bar--delay-2::after {
  animation-delay: 300ms;
}

.loader__bar--delay-3::before,
.loader__bar--delay-3::after {
  animation-delay: 400ms;
}

.loader__bar--delay-4::before,
.loader__bar--delay-4::after {
  animation-delay: 500ms;
}

.loader__bar--delay-5::before,
.loader__bar--delay-5::after {
  animation-delay: 600ms;
}
</style>
