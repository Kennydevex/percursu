// jshint esversion:6
export function init(store, router) {
    router.beforeEach((to, from, next) => {
        const authUser = store.state.authentication.authUser;
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const admin = to.matched.some(record => record.meta.admin);
        const supee_admin = to.matched.some(record => record.meta.supee_admin);
        const manager = to.matched.some(record => record.meta.manager);
        const publiser = to.matched.some(record => record.meta.publiser);

        if (authUser) {
            axios.defaults.headers.common = {
                "Authorization": `Bearer ${authUser.token}`,
                "Content-Type": "multipart/form-data",
                "X-Requested-With": "XMLHttpRequest"
            };
        }

        function role(name) {
            authUser.roles.forEach(function (role) {
                if (role.name == name) {
                    return true;
                }
            });
        }

        if (requiresAuth && !authUser) {
            next('/login');
        } else if (to.path == '/login' && authUser) {
            console.log(authUser);

            next('/');
        } else {
            if (manager && !role('write2r')) {
                console.log(role("write2r"));

                next('/403');
            }
            next();

        }
    });

    axios.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            store.commit('logout');
            router.push('/login');
        }

        if (error.response.status == 403) {
            router.push('/403');
        }
        return Promise.reject(error);
    });
}
