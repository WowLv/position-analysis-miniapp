const user = {
	state: {
		userInfo: {},
		searchHistory: [],
		userCollect: [],
		userDelivery:[],
		eduInfo: [],
		projInfo: [],
		resumeInfo: {}
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
		userCollect: state => state.userCollect,
		userDelivery: state => state.userDelivery,
		resumeInfo: state => state.resumeInfo,
		eduInfo: state => state.eduInfo,
		projInfo: state => state.projInfo
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
		
		//存储用户收藏
		SET_COLLECT: (state, userCollect) => {
			if(userCollect instanceof Array) {
				state.userCollect = userCollect
			}else {
				// if(userCollect.companyLogo.indexOf('www.') > -1) {
				// 	userCollect.companyLogo = `//www.lgstatic.com/thumbnail_160x160/${userCollect.companyLogo}`
				// }
				state.userCollect.unshift(userCollect)
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
			console.log(state.userCollect)
			uni.setStorageSync('collectList', state.userCollect)
		},
		
		//存储用户投递
		SET_DELIVERY: (state, userDelivery) => {
			if(userDelivery instanceof Array) {
				state.userDelivery = userDelivery
			}else {
				// if(userDelivery.companyLogo.indexOf('www.') > -1) {
				// 	userDelivery.companyLogo = `//www.lgstatic.com/thumbnail_160x160/${userDelivery.companyLogo}`
				// }
				state.userDelivery.unshift(userDelivery)
				uni.setStorageSync('deliveryList', state.userDelivery)
			}
			
		},
		DELETE_DELIVERY: (state, pid) => {
			state.userDelivery.map((item) => {
				if(parseInt(item.positionId) === pid) {
					let index = state.userDelivery.indexOf(item)
					state.userDelivery.splice(index,1)
				}
			})
			console.log(state.userDelivery)
			uni.setStorageSync('deliveryList', state.userDelivery)
		},
		
		SET_RESUMEINFO: (state, resumeInfo) => {
			state.resumeInfo = resumeInfo
			uni.setStorageSync('infoObj', resumeInfo)
		},
		SET_EDU: (state, eduInfo) => {
			if(eduInfo instanceof Array) {
				state.eduInfo = eduInfo
			}else {
				var eduFlag = 1
				state.eduInfo.forEach((item) => {
					if(item.eid === eduInfo.eid) {
						item = eduInfo
						eduFlag = 0
					}
				})
				if(eduFlag) {
					state.eduInfo.push(eduInfo)
				}
				uni.setStorageSync('eduList', state.eduInfo)
			}
			// console.log(eduInfo)
			console.log(state.eduInfo)
		},
		DELETE_EDU: (state, eid) => {
			state.eduInfo.forEach((item) => {
				if(item.eid === eid) {
					let index = state.eduInfo.indexOf(item)
					state.eduInfo.splice(index, 1)
				}
			})
			uni.setStorageSync('eduList', state.eduInfo)
		},
		SET_PROJ: (state, projInfo) => {
			if(projInfo instanceof Array) {
				state.projInfo = projInfo
			}else {
				var projFlag = 1
				state.projInfo.forEach((item) => {
					if(item.pid === projInfo.pid) {
						item = projInfo
						projFlag = 0
					}
				})
				if(projFlag) {
					state.projInfo.push(projInfo)
				}
				uni.setStorageSync('projList', state.projInfo)
			}
			// console.log(eduInfo)
			console.log(state.projInfo)
		},
		DELETE_PROJ: (state, pid) => {
			state.projInfo.forEach((item) => {
				if(item.pid === pid) {
					let index = state.projInfo.indexOf(item)
					state.projInfo.splice(index, 1)
				}
			})
			uni.setStorageSync('projList', state.projInfo)
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
		},
		setDelivery({ commit }, userDelivery) {
			commit('SET_DELIVERY', userDelivery)
		},
		deleteDelivery({ commit }, pid) {
			commit('DELETE_DELIVERY', pid)
		},
		setResumeInfo({ commit }, resumeInfo) {
			commit('SET_RESUMEINFO', resumeInfo)
		},
		setEduInfo({ commit }, eduInfo) {
			commit('SET_EDU', eduInfo)
		},
		deleteEduInfo({ commit }, eid) {
			commit('DELETE_EDU', eid)
		},
		setProjInfo({ commit }, projInfo) {
			commit('SET_PROJ', projInfo)
		},
		deleteProjInfo({ commit }, pid) {
			commit('DELETE_PROJ', pid)
		}
	}
}
export default user