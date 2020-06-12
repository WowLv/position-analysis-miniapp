<script>
import { mapActions } from 'vuex'
	export default {
		onLaunch() {
			let list = uni.getStorageSync('collectList')
			if(list && list.length) {
				console.log('ok')
				this.setCollect(list)
			}
		},
		methods: {
			...mapActions([
				'setCollect'
			])
		}
	}
</script>
	
<style>
	/*每个页面公共css */
</style>
