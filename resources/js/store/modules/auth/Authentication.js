// jshint esversion:6
import {getAuthLocalUser} from '@helpers/authentication'
const user = getAuthLocalUser();
export default ({
    state: {
        authUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
    },

    getters: {
        authUser(state) {
            return state.authUser;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        isLoading(state) {
            return state.loading;
        },
        authError(state) {
            return state.auth_error;
        },
    },

    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.loading = false;
            state.auth_error = null;
            state.isLoggedIn = true;
            state.authUser = Object.assign({}, payload.user, {
                token: payload.token
            });

            localStorage.setItem("user", JSON.stringify(state.authUser));

        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false;
            state.authUser = null;
        },
    },

    actions: {
        login(context) {
            context.commit("login");
        },
    },

})
