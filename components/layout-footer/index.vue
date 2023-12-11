<script setup lang="ts">
const DATE = new Date("2023/10/28 00:00:00");

let d = $ref(0);
let h = $ref(0);
let m = $ref(0);
let s = $ref(0);
useIntervalFn(() => {
	const t = Math.floor((new Date().getTime() - DATE.getTime()) / 1000);

	d = Math.floor(t / 86400);
	h = Math.floor((t % 86400) / 3600);
	m = Math.floor((t % 3600) / 60);
	s = Math.floor(t % 60);
}, 1000);

const { data: message, execute: executeMessage } = await useFetch<any>("/api/common/tiangou");
const nextMessage = () => setTimeout(() => executeMessage(), 5000);
</script>

<template>
	<footer
		text="14px center" p="2em" lh="[1]" flex="~ col"
		items="center"
	>
		<music-icon-lines />

		<typewriter m="1em" :content="message?.content" @finish="nextMessage" />
		<p class="runtime">
			本站目前勉强运行了{{ d }}天{{ h }}时{{ m }}分{{ s }}秒
		</p>

		<div flex="~" gap=".5em">
			<p>
				©2023-{{ new Date().getFullYear() }} By
				<nuxt-link un-text="[var(--text-color)]" underline="transparent" to="mailto:wsvaio@qq.com">WSVAIO</nuxt-link>
			</p>
			<p>|</p>
			<p>
				<nuxt-link
					un-text="[var(--text-color)]"
					underline="transparent"
					to="https://beian.miit.gov.cn/"
					target="_blank"
				>
					豫ICP备2023030609号-1
				</nuxt-link>
			</p>
		</div>
	</footer>
</template>

<style lang="less" scoped>
footer {
  @keyframes h {
    2% {
      transform: translateY(1.5px) rotate(1.5deg);
    }

    4% {
      transform: translateY(-1.5px) rotate(-0.5deg);
    }

    6% {
      transform: translateY(1.5px) rotate(-1.5deg);
    }

    8% {
      transform: translateY(-1.5px) rotate(-1.5deg);
    }

    10% {
      transform: translateY(2.5px) rotate(1.5deg);
    }

    12% {
      transform: translateY(-0.5px) rotate(1.5deg);
    }

    14% {
      transform: translateY(-1.5px) rotate(1.5deg);
    }

    16% {
      transform: translateY(-0.5px) rotate(-1.5deg);
    }

    18% {
      transform: translateY(0.5px) rotate(-1.5deg);
    }

    20% {
      transform: translateY(-1.5px) rotate(2.5deg);
    }

    22% {
      transform: translateY(0.5px) rotate(-1.5deg);
    }

    24% {
      transform: translateY(1.5px) rotate(1.5deg);
    }

    26% {
      transform: translateY(0.5px) rotate(0.5deg);
    }

    28% {
      transform: translateY(0.5px) rotate(1.5deg);
    }

    30% {
      transform: translateY(-0.5px) rotate(2.5deg);
    }

    32% {
      transform: translateY(1.5px) rotate(-0.5deg);
    }

    34% {
      transform: translateY(1.5px) rotate(-0.5deg);
    }

    36% {
      transform: translateY(-1.5px) rotate(2.5deg);
    }

    38% {
      transform: translateY(1.5px) rotate(-1.5deg);
    }

    40% {
      transform: translateY(-0.5px) rotate(2.5deg);
    }

    42% {
      transform: translateY(2.5px) rotate(-1.5deg);
    }

    44% {
      transform: translateY(1.5px) rotate(0.5deg);
    }

    46% {
      transform: translateY(-1.5px) rotate(2.5deg);
    }

    48% {
      transform: translateY(-0.5px) rotate(0.5deg);
    }

    50% {
      transform: translateY(0.5px) rotate(0.5deg);
    }

    52% {
      transform: translateY(2.5px) rotate(2.5deg);
    }

    54% {
      transform: translateY(-1.5px) rotate(1.5deg);
    }

    56% {
      transform: translateY(2.5px) rotate(2.5deg);
    }

    58% {
      transform: translateY(0.5px) rotate(2.5deg);
    }

    60% {
      transform: translateY(2.5px) rotate(2.5deg);
    }

    62% {
      transform: translateY(-0.5px) rotate(2.5deg);
    }

    64% {
      transform: translateY(-0.5px) rotate(1.5deg);
    }

    66% {
      transform: translateY(1.5px) rotate(-0.5deg);
    }

    68% {
      transform: translateY(-1.5px) rotate(-0.5deg);
    }

    70% {
      transform: translateY(1.5px) rotate(0.5deg);
    }

    72% {
      transform: translateY(2.5px) rotate(1.5deg);
    }

    74% {
      transform: translateY(-0.5px) rotate(0.5deg);
    }

    76% {
      transform: translateY(-0.5px) rotate(2.5deg);
    }

    78% {
      transform: translateY(-0.5px) rotate(1.5deg);
    }

    80% {
      transform: translateY(1.5px) rotate(1.5deg);
    }

    82% {
      transform: translateY(-0.5px) rotate(0.5deg);
    }

    84% {
      transform: translateY(1.5px) rotate(2.5deg);
    }

    86% {
      transform: translateY(-1.5px) rotate(-1.5deg);
    }

    88% {
      transform: translateY(-0.5px) rotate(2.5deg);
    }

    90% {
      transform: translateY(2.5px) rotate(-0.5deg);
    }

    92% {
      transform: translateY(0.5px) rotate(-0.5deg);
    }

    94% {
      transform: translateY(2.5px) rotate(0.5deg);
    }

    96% {
      transform: translateY(-0.5px) rotate(1.5deg);
    }

    98% {
      transform: translateY(-1.5px) rotate(-0.5deg);
    }

    0%,
    100% {
      transform: translate(0) rotate(0deg);
    }
  }

  border-top: 1px solid rgb(204 204 204 / 80%);
  // background-color: rgb(255 255 255 / 80%);
  backdrop-filter: blur(5px);
  background-color: var(--bg-color);

	.runtime {
		animation: h 5s infinite ease-in-out;
	}
}
</style>
