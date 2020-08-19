import heroSearchService from '@/services/hero-search.service'

const state = {
    heroData: []
}

const getters = {
    search: (state) => (heroSearchForm) => {
        return heroSearchService.search(state.heroData, heroSearchForm)
    }
}

// Actions can be asynchronous
const actions = {
    /**
     * This function will need modification when a backend is implemented.
     * @param store
     * @returns {Promise<>}
     */
    loadAllHeroData(store) {
        return heroSearchService.queryAll().then((data) => {
            store.commit('cacheHeroData', { heroData: data })
        })
    }
}

// Mutations must always be synchronous
const mutations = {
    cacheHeroData(state, payload) {
        state.heroData = payload.heroData
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
