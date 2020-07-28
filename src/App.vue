<script>
import { mapActions } from 'vuex'
	export default {
		onLaunch() {
			//模拟首页加载时从用户服务器拉取用户数据
			let collectList = uni.getStorageSync('collectList')
			if(collectList && collectList.length) {
				console.log('ok')
				this.setCollect(collectList)
			}

			let resumeInfo = uni.getStorageSync('infoObj')
			if(resumeInfo) {
				this.setResumeInfo(resumeInfo)
			}

			let eduList = uni.getStorageSync('eduList')
			if(eduList && eduList.length) {
				this.setEduInfo(eduList)
			}

			let projList = uni.getStorageSync('projList')
			if(projList && projList.length) {
				this.setProjInfo(projList)
			}

			if(uni.getStorageSync('hopeObj')) {
				let firstHopeObj = uni.getStorageSync('hopeObj')
				let keys = Object.keys(firstHopeObj)
				Object.values(firstHopeObj).map((item, index) => {
					if(item) {
						this.setHopeData({type: keys[index], data: item})
					}
				})
			}
			if(uni.getStorageSync('userHabit')) {
				let userHabit = uni.getStorageSync('userHabit')
				this.setUserHabit(userHabit)
			}
		},
		methods: {
			...mapActions([
				'setCollect',
				'setEduInfo',
				'setResumeInfo',
				'setHopeData',
				'setProjInfo',
				'setUserHabit'
			])
		}
	}
</script>
	
<style>
/* @import unl('~@/static/styles/weui.wxss') */
@import url('~@/static/styles/weui.wxss');
</style>

