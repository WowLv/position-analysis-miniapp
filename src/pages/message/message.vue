<template>
	<view class="container">
		<text class="message_main">暂无新消息</text>
	</view>
</template>

<script>
	export default {

	}
</script>

<style scoped lang="scss">

	.container {
		height:100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $border-color;
		.message_main {
			font-size: $main-size;
			color: $shallow-color;
		}
	}

</style>
