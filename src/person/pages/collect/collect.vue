<template>
	<view class="container">
		<position-list :posList="userCollect"></position-list>
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

</style>