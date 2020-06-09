import { getRegionRank, getProvinceRank } from '@/utils/api'
import { TopFiveDate } from '@/utils/utils'
const hope = {
	state: {
		hopeSalary: '',
		hopeCity: '',
		hopeType: '',
		hopeDate: '',
		hopePos: '',
		regionRank: [],
		skillRank: []
	},
	getters: {
		hopeSalary: state => state.hopeSalary,
		hopeCity: state => state.hopeCity,
		hopeType: state => state.hopeType,
		hopeDate: state => state.hopeDate,
		hopePos: state => state.hopePos,
		regionRank: state => state.regionRank,
		skillRank: state => state.skillRank
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
		},
		SET_HOPEPOS: (state, hopePos) => {
			state.hopePos = hopePos
		},
		SET_REGIONRANK: (state, regionRank) => {
			state.regionRank = regionRank
		},
		SET_SKILLRANK: (state, skillRank) => {
			state.skillRank = skillRank
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
		async setHopeData({ commit }, hopeData) {
			switch(hopeData.type){
				case 'hopeSalary':
					commit('SET_HOPESALARY', hopeData.data)
					break;
				case 'hopeCity':
					console.log(hopeData.data)
					commit('SET_HOPECITY', hopeData.data)
					if(hopeData.data) {
						let res = await getRegionRank({level: 3, region: hopeData.data})
						commit('SET_REGIONRANK', res.data.hotRegion)
						commit('SET_SKILLRANK', TopFiveDate(res.data.skill))
					}else {
						let regionRes = await getProvinceRank()
						let skillRes = await getRegionRank()
						commit('SET_REGIONRANK', TopFiveDate(regionRes.data))
						commit('SET_SKILLRANK', TopFiveDate(skillRes.data.skill))
					}
					
					break;
				case 'hopeType':
					commit('SET_HOPETYPE', hopeData.data)
					break;
				case 'hopeDate':
					commit('SET_HOPEDATE', hopeData.data)
					break;
				case 'hopePos':
					commit('SET_HOPEPOS', hopeData.data)
					break;
			}
		}
	}
}

export default hope