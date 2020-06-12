const user = {
	state: {
		userInfo: {},
		searchHistory: [],
		userCollect: []
	},
	getters: {
		userInfo: state => state.userInfo,
		
		//搜索记录保存到vuex，显示最后8个
		searchHistory: state => {
			let history = state.searchHistory
			if(history.length <= 8) {
				return history.slice(0, history.length)
			}else {
				return history.slice(0, 8)
			}
		},
		userCollect: state => state.userCollect
	},
	mutations: {
		SET_USERLOCATION: (state, userInfo) => {
			state.userInfo.location = userInfo
		},
		SET_SEARCHHISTORY: (state, searchHistory) => {
			// 首次加载从本地获取数组数据(模拟从服务器获取)
			if(searchHistory instanceof Array) {
				state.searchHistory = searchHistory
			} else {
				let flag = 1
				const length = state.searchHistory.length
				if(length === 0) {
					state.searchHistory.unshift(searchHistory)
				}else {
					state.searchHistory.map((item, index) => {
						if(item.value === searchHistory.value) {
							flag = 0
						}
					})
					flag && state.searchHistory.unshift(searchHistory)
				}
			}
		},
		CLEAR_SEARCHHISTORY: (state) => {
			state.searchHistory = []
			uni.clearStorage('searchHistory');
		},
		SET_COLLECT: (state, userCollect) => {
			if(userCollect instanceof Array) {
				state.userCollect = userCollect
			}else {
				// if(userCollect.companyLogo.indexOf('www.') > -1) {
				// 	userCollect.companyLogo = `//www.lgstatic.com/thumbnail_160x160/${userCollect.companyLogo}`
				// }
				state.userCollect.unshift(userCollect)
				console.log(userCollect)
				uni.setStorageSync('collectList', state.userCollect)
			}
			
		},
		DELETE_COLLECT: (state, pid) => {
			state.userCollect.map((item) => {
				if(parseInt(item.positionId) === pid) {
					let index = state.userCollect.indexOf(item)
					state.userCollect.splice(index,1)
				}
			})
			uni.setStorageSync('collectList', state.userCollect)
		}
	},
	actions: {
		setUserInfo({ commit }, userInfo) {
			switch(userInfo.type) {
				case 'location':
					commit('SET_USERLOCATION', userInfo.data)
					break
			}
		},
		setSearchHistory({ commit }, searchHistory) {
			commit('SET_SEARCHHISTORY', searchHistory)
		},
		clearSearchHistory({ commit }) {
			commit('CLEAR_SEARCHHISTORY')
		},
		setCollect({ commit }, userCollect) {
			commit('SET_COLLECT', userCollect)
		},
		deleteCollect({ commit }, pid) {
			commit('DELETE_COLLECT', pid)
		}
	}
}
export default user