const user = {
	state: {
		userInfo: null
	},
	getters: {
		userInfo: state => state.userInfo
	},
	mutations: {
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo
		}
	},
	actions: {
		setUserInfo({ commit }, userInfo) {
			commit('SET_USERINFO', userInfo)
		}
	}
}
export default user