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
		},
		methods: {
			...mapActions([
				'setCollect',
				'setEduInfo',
				'setResumeInfo'
			])
		}
	}
</script>
	
<style>
/* @import unl('~@/static/styles/weui.wxss') */
@import url('~@/static/styles/weui.wxss');
</style>

