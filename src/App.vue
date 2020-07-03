<script>
import { mapActions } from 'vuex'
	export default {
		onLaunch() {
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

			if(uni.getStorageSync('hopeObj')) {
				let firstHopeObj = uni.getStorageSync('hopeObj')
				let keys = Object.keys(firstHopeObj)
				Object.values(firstHopeObj).map((item, index) => {
					if(item) {
						this.setHopeData({type: keys[index], data: item})
					}
				})
				console.log(this.hopeObj)
			}
		},
		methods: {
			...mapActions([
				'setCollect',
				'setEduInfo',
				'setResumeInfo',
				'setHopeData'
			])
		}
	}
</script>
	
<style>
/* @import unl('~@/static/styles/weui.wxss') */
@import url('~@/static/styles/weui.wxss');
</style>

