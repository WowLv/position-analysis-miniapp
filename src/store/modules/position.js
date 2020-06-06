const position = {
    state: {
        loadedPosList: [],
        searchedPosList: []
    },
	getters: {
        loadedPosList: state => state.loadedPosList,
        searchedPosList: state => state.searchedPosList
    },
	mutations: {
        SET_LOADEDPOSLIST: (state, loadedPosList) => {
            loadedPosList.forEach(item => {
                item.companyLogo = `//www.lgstatic.com/thumbnail_160x160/${item.companyLogo}`
            })
            state.loadedPosList.push(...loadedPosList)
        },
        SET_SEARCHEDPOSLIST: (state, searchedPosList) => {
            searchedPosList.forEach(item => {
                item.companyLogo = `//www.lgstatic.com/thumbnail_160x160/${item.companyLogo}`
            })
            state.searchedPosList.push(...searchedPosList)
        },
        CLEAR_POSLIST: (state) => {
            state.loadedPosList = []
        },
        CLEAR_SEARCHLIST: (state) => {
            state.searchedPosList = []
        }
    },
    actions: {
        setLoadedPosList({ commit }, loadedPosList) {
            commit('SET_LOADEDPOSLIST', loadedPosList)
        },
        clearPosList({ commit }) {
            commit('CLEAR_POSLIST')
        },
        setSearchedPosList({ commit }, searchedPosList) {
            commit('SET_SEARCHEDPOSLIST', searchedPosList)
        },
        clearSearchList({ commit }) {
            commit('CLEAR_SEARCHLIST')
        }
    }
}

export default position