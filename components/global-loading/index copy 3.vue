<script setup lang="ts"></script>

<template>
	<div class="global-loading">
		<div class="loader" />
	</div>
</template>

<style>
@keyframes jump7456 {
	15% {
		border-bottom-right-radius: 3px;
	}

	25% {
		transform: translateY(9px) rotate(22.5deg);
	}

	50% {
		transform: translateY(18px) scale(1, 0.9) rotate(45deg);
		border-bottom-right-radius: 40px;
	}

	75% {
		transform: translateY(9px) rotate(67.5deg);
	}

	100% {
		transform: translateY(0) rotate(90deg);
	}
}

@keyframes shadow324 {
	0%,
	100% {
		transform: scale(1, 1);
	}

	50% {
		transform: scale(1.2, 1);
	}
}

@media (prefers-color-scheme: dark) {
	.global-loading {
		background-color: #101014 !important;
	}
}

.global-loading {
	display: flex;
	position: fixed;
	z-index: 9000;
	align-items: center;
	justify-content: center;
	inset: 0;
	background-color: white;
}

.global-loading > .loader {
	position: relative;
	width: 48px;
	height: 48px;
}

.global-loading > .loader::before {
	content: "";
	position: absolute;
	top: 60px;
	left: 0;
	width: 48px;
	height: 5px;
	animation: shadow324 0.5s linear infinite;
	border-radius: 50%;
	background: #f0808050;
	background: var(--primary-color7, #d94e98);
}

.global-loading > .loader::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	animation: jump7456 0.5s linear infinite;
	border-radius: 4px;
	background: var(--primary-color6, #FF69B4);
}
</style>
