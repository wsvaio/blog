<script setup lang="ts"></script>

<template>
	<div class="music">
		<span />
		<span />
		<span />
		<span />
		<span />
		<span />
		<span />
		<span />
		<span />
	</div>
</template>

<style lang="less" scoped>
.music {
  display: flex;
  // width: 175px;
  height: 100px;
}

.music span {
  width: 6px;
  margin-right: 6px;
  border-radius: 18px;
}

.music span:nth-child(1) {
  /* 时间递增，参差不齐的效果 */
  animation: bar1 2s 0.2s infinite linear;
}

.music span:nth-child(2) {
  animation: bar2 2s 0.4s infinite linear;
}

.music span:nth-child(3) {
  animation: bar3 2s 0.6s infinite linear;
}

.music span:nth-child(4) {
  animation: bar4 2s 0.8s infinite linear;
}

.music span:nth-child(5) {
  animation: bar5 2s 1s infinite linear;
}

.music span:nth-child(6) {
  animation: bar6 2s 1.2s infinite linear;
}

.music span:nth-child(7) {
  animation: bar7 2s 1.4s infinite linear;
}

.music span:nth-child(8) {
  animation: bar8 2s 1.6s infinite linear;
}

.music span:nth-child(9) {
  animation: bar9 2s 1.8s infinite linear;
}

@keyframes bar1 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #f677b0;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #f677b0;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #f677b0;
  }
}

@keyframes bar2 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #df7ff2;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #df7ff2;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #df7ff2;
  }
}

@keyframes bar3 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #8c7ff2;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #8c7ff2;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #8c7ff2;
  }
}

@keyframes bar4 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #7fd0f2;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #7fd0f2;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #7fd0f2;
  }
}

@keyframes bar5 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #7ff2d3;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #7ff2d3;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #7ff2d3;
  }
}

@keyframes bar6 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #7ff2a0;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #7ff2a0;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #7ff2a0;
  }
}

@keyframes bar7 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #adf27f;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #adf27f;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #adf27f;
  }
}

@keyframes bar8 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #e7f27f;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #e7f27f;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #e7f27f;
  }
}

@keyframes bar9 {
  0% {
    height: 10%;
    margin-top: 25%;
    background: #ecaa64;
  }

  50% {
    height: 100%;
    margin-top: 0%;
    background: #ecaa64;
  }

  100% {
    height: 10%;
    margin-top: 25%;
    background: #ecaa64;
  }
}
</style>
