<template>
	<view class="container">
		<view class="none" v-if="!userDelivery.length">暂无投递记录</view>
		<position-list :posList="userDelivery" mode="history" v-else></position-list>
	</view>
</template>

<script>
import PositionList from '@/components/positionList/positionList'
import { mapGetters } from 'vuex'
export default {
	data() {
		return {

		}
	},
	components: {
		PositionList
	},
	computed: {
		...mapGetters([
			'userDelivery'
		])
	}
}
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background-color: $back-color;
	position: relative;
	.none {
		position: absolute;
		top: 300rpx;
		left: 38%;
		color: $middle-color;
	}
}
</style>