<template>
	<picker 
	class="picker"
	mode="date"
    start="2020-05-29"
    :end="end"
    @change="handleDate">
		<text class="item_title">{{pName}}</text>
		<text class="item_selected">{{pValue}}</text>
		<text class="iconfont icon-arrow-right"></text>
	</picker>
</template>

<script>
import { getStartDate, getEndDate } from '../../../utils/utils'
	export default {
		props: {
			pName: {
				type: String,
				default: ''
			},
			pValue: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				start: '',
				end: ''
			};
		},
		created() {
            this.start = getStartDate()
            this.end = getEndDate()
		},
		methods: {
			handleDate(e) {
                this.$emit('comfirm', { type: 'hopeDate', data: e.detail.value})
            }
		}
		
	}
</script>

<style scoped lang="scss">
	.picker {
		width: 100%;
		height: 100rpx;
		position: relative;
		line-height: 100rpx;
		.item_title {
			color: $main-color;
			font-size: 35rpx;
		}
		.item_selected {
			position: absolute;
			color: $shallow-color;
			font-size: $main-size;
			right: 60rpx;
		}
		.icon-arrow-right {
			position: absolute;
			color: $shallow-color;
			margin-left: 20rpx;
			right: 0;
			font-size: $small-size;
		}
	}
	
</style>
