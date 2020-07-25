import Vue from 'vue'
import Vuex from 'vuex'

// import something from './modules/something.store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        // something
    },
    strict: debug
})
