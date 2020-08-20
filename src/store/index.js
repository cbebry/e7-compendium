import Vue from 'vue'
import Vuex from 'vuex'

import hero from './modules/hero.store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        hero
    },
    strict: debug
})
