
const hope = {
	state: {
		hopeSalary: '',
		hopeCity: '',
		hopeType: ''
	},
	getters: {
		hopeSalary: state => state.hopeSalary,
		hopeCity: state => state.hopeCity,
		hopeType: state => state.hopeType
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
		}
	},
	actions: {
		setHopeSalary({ commit }, hopeSalary) {
			commit('SET_HOPESALARY', hopeSalary)
		},
		setHopeCity({ commit }, hopeCity) {
			commit('SET_HOPECITY', hopeCity)
		},
		setHopeType({ commit }, hopeType) {
			commit('SET_HOPETYPE', hopeType)
		}
	}
}

export default hope