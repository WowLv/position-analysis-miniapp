<template>
	<view class="container">
		<position-list :posList="userCollect" mode="collect"></position-list>
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
			'userCollect'
		])
	}
}
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background-color: $back-color;
}
</style>