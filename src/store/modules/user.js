const user = {
	state: {
		userInfo: {}
	},
	getters: {
		userInfo: state => state.userInfo
	},
	mutations: {
		SET_USERLOCATION: (state, userInfo) => {
			state.userInfo.location = userInfo
		}
	},
	actions: {
		setUserInfo({ commit }, userInfo) {
			switch(userInfo.type) {
				case 'location':
					commit('SET_USERLOCATION', userInfo.data)
					break
			}
			
		}
	}
}
export default user