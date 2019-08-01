// jshint esversion:6
export function init(store, router) {
    router.beforeEach((to, from, next) => {
        const authUser = store.state.authentication.authUser;
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const roles = to.matched.some(record => record.meta.roles);

        if (authUser) {
            axios.defaults.headers.common = {
                "Authorization": `Bearer ${authUser.token}`,
                "Content-Type": "multipart/form-data",
                "X-Requested-With": "XMLHttpRequest"
            };
        }

        if (requiresAuth && !authUser) {
            next('/login');
        } else if (to.path == '/login' && authUser) {
            next('/');
        } else {
            next();
        }
    });

    axios.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            store.commit('logout');
            router.push('/login');
        }
        return Promise.reject(error);
    });
}
