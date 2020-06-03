const user = {
	state: {
		userInfo: {},
		searchHistory: []
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
		}
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
		CLEAR_SEARCHHISTORY: (state, searchHistory) => {
			state.searchHistory = []
			uni.clearStorage('searchHistory');
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
		}
	}
}
export default user