<template>
	<view class="container">
		<view class="experience">
			<text class="title">职业标签</text>
			<view class="edu_list" v-for="(item,index) in labelData" :key="index" @click="chage(index)">
				<view class="edu_list_right">{{item}}</view>
				<view class="edu_list_left"></view>
				<view></view>
			</view>
			<view class="add_experience" v-if="showAdd" @click="add"><text class="add">+</text>添加职业标签</view>
		</view>
	</view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			avatarSrc: '',
			mode: '',
			posData: {},
			labelData:[],
		}
	},
	onLoad(){
		let obj = this
		uni.getStorage({
		    key: 'onlabelData',
		    success: function (res) {
				obj.labelData = res.data
		    },
			fail:function(res){
				console.log('shibai')
				uni.setStorage({
				    key: 'onlabelData',
				    data: obj.labelData,
				    success: function () {
				        console.log('success',obj.labelData);
				    }
				});
			}
		});
		
	},
	onShow() {
		let obj = this
		uni.getStorage({
		    key: 'onlabelData',
		    success: function (res) {
				obj.labelData = res.data
		    }
		});
		
	},
	computed: {
		showAdd:function(){
			if( this.labelData.length <= 4 ){
				return true
			}else{
				return false
				
				/* let a = new Array(6)
				for(let b in this.labelData){
					a[b] = this.labelData[b]
				} */
			}
		}
	},
	methods: {
		add(){
			uni.navigateTo({
				 url: '../../../pages/selectPosition/selectPosition?mode=search&lable=6'
			});
		},
		chage(e){
			console.log(e)
			uni.navigateTo({
				 url: '../../../pages/selectPosition/selectPosition?mode=search&lable='+ e
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: $back-color;
	.experience {
		margin-top: 20rpx;
		background-color: white;
		.title {
			font-size: $main-size;
			color: $main-color;
			display: block;
			padding: 15rpx 0 15rpx 30rpx;
			border-bottom: 2rpx solid $border-color;
		}
		.edu_list{
			text-align: center;
			padding: 0 35rpx;
			margin: 20rpx 0;
			.edu_list_right{
				border: 2rpx solid #3a3cd7;
				border-radius: 20rpx;
				height: 100rpx;
				width: 100%;
				color: #ffffff;
				background-color: #4a4cd8;
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
		.add_experience {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 15rpx 0;
			font-size: $main-size;
			color: $main-color;
			.add {
				margin: 0 10rpx;
				padding-bottom: 10rpx;
				font-size: 40rpx;
				font-weight: 500;
				color: $actived-color;
			}
		}
		
	}
}
</style>