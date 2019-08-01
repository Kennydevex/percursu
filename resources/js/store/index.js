import Vue from 'vue'
import Vuex from 'vuex'
// Modules
//Sys
import users from './modules/sys/Users'
//Auth
import authentication from './modules/auth/Authentication'
//Percursu
import charges from './modules/percursu/Charges'
import partners from './modules/percursu/Partners'

Vue.use(Vuex)
export default new Vuex.Store({
    strict: true,
    modules: {
        authentication,
        users,
        charges,
        partners,
    },
})
