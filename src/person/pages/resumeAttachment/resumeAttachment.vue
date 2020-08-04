<template>
	<view class="container">
		<view class="none" v-if="attachmentList.length === 0">暂无附件简历</view>
		<view v-else v-for="(item,index) in attachmentList" :key="index"  class="watch">
			<text class="info">{{item.name}}</text>
			<text class="view" @click="viewResume" data-index='{{index}}'>预览</text>
			<text class="delete" @click="deleteResume" data-index='{{index}}'>删除</text>
		</view>
		<view class="add_resume" @click="upLoadFile" v-if="attachmentList.length<=2">
			<text class="add">+</text>上传简历
		</view>
	</view>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
	data() {
		return {
			// 存放简历信息
			attachmentList: []
		}
	},
	onShow() {
		//取缓存的数据
		let data = uni.getStorageSync('attachment')
		console.log(data)
		if(data) {
			this.attachmentList = data 
		}else {
			attachmentList: []
		}
	},
	methods: {
		// 下载简历文件
		upLoadFile(e) {
			//保存this对象
			const app = this;
			wx.chooseMessageFile({
				count:1,
				type:'file',
				success(res) {
					let temp={
						name:res.tempFiles[0].name,
						path:res.tempFiles[0].path
					};
					app.attachmentList.push(temp),
					uni.setStorageSync('attachment', app.attachmentList)
				}
			})
		},
		// 查看简历
		viewResume(event) {
			let index = event.currentTarget.dataset.index;
			wx.downloadFile({
				url : this.attachmentList[index].path,
				success(res){
					// console.log(res)
					const filePath = res.tempFilePath
					wx.openDocument({
						filePath: filePath,
						success: function (res) {
							console.log('打开文档成功')
							// console.log(res)
						}
					})
				}
			})
		},
		// 删除简历
		deleteResume(event) {
			let index = event.currentTarget.dataset.index;
			this.attachmentList.splice(index,1);
			uni.setStorageSync('attachment', this.attachmentList)
		}
	}
}
</script>

<style scoped lang="scss">
	.container {
		margin: 70rpx;
		.none {
			text-align: center;
			font-size: $big-size;
		}
		.watch {
			font-size: $title-size;
			display: flex;
			margin: 50rpx;
			text-align: center;
			justify-content: center;
			align-items: center;
			.info {
				flex: 6;
			}
			.view {
				flex: 2;
				color: $actived-color;
			}
			.delete {
				color: $salary-color;
				flex: 2;
			}
		}
		.add_resume {
			margin-top: 150rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 15rpx 0;
			font-size: $big-size;
			color: $main-color;
			.add {
				margin: 0 10rpx;
				padding-bottom: 10rpx;
				font-size: $biger-size;
				font-weight: 500;
				color: $actived-color;
			}
		}
	}
</style>
