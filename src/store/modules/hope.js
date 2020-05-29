
const hope = {
	state: {
		hopeSalary: '',
		hopeCity: '',
		hopeType: '',
		hopeDate: ''
	},
	getters: {
		hopeSalary: state => state.hopeSalary,
		hopeCity: state => state.hopeCity,
		hopeType: state => state.hopeType,
		hopeDate: state => state.hopeDate
	},
	mutations: {
		SET_HOPESALARY: (state, hopeSalary) => {
			state.hopeSalary = hopeSalary
		},
		SET_HOPECITY: (state, hopeCity) => {
			state.hopeCity = hopeCity
		},
		SET_HOPETYPE: (state, hopeType) => {
			state.hopeType = hopeType
		},
		SET_HOPEDATE: (state, hopeDate) => {
			state.hopeDate = hopeDate
		}
	},
	actions: {
		// setHopeSalary({ commit }, hopeSalary) {
		// 	commit('SET_HOPESALARY', hopeSalary)
		// },
		// setHopeCity({ commit }, hopeCity) {
		// 	commit('SET_HOPECITY', hopeCity)
		// },
		// setHopeType({ commit }, hopeType) {
		// 	commit('SET_HOPETYPE', hopeType)
		// },
		// setHopeDate({ commit }, hopeDate) {
		// 	commit('SET_HOPEDATE', hopeDate)
		// }
		setHopeData({ commit }, hopeData) {
			switch(hopeData.type){
				case 'hopeSalary':
					commit('SET_HOPESALARY', hopeData.data)
					break;
				case 'hopeCity':
					commit('SET_HOPECITY', hopeData.data)
					break;
				case 'hopeType':
					commit('SET_HOPETYPE', hopeData.data)
					break;
				case 'hopeDate':
					commit('SET_HOPEDATE', hopeData.data)
					break;
			}
		}
	}
}

export default hope