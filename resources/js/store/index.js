import Vue from 'vue'
import Vuex from 'vuex'
// Modules
import users from './modules/sys/Users'
import authentication from './modules/auth/Authentication'

Vue.use(Vuex)
export default new Vuex.Store({
    strict: true,
    modules: {
        authentication,
        users,
    },
})
