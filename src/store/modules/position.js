const position = {
    state: {
        loadedPosList: []
    },
	getters: {
        loadedPosList: state => state.loadedPosList
    },
	mutations: {
        SET_LOADEDPOSLIST: (state, loadedPosList) => {
            state.loadedPosList.push(...loadedPosList)
        },
        CLEAR_POSLIST: (state) => {
            state.loadedPosList = []
        },
    },
    actions: {
        setLoadedPosList({ commit }, loadedPosList) {
            commit('SET_LOADEDPOSLIST', loadedPosList)
        },
        clearPosList({ commit }) {
            commit('CLEAR_POSLIST')
        }
    }
}

export default position