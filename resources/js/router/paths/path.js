
// ==================  Geral  ===========================
// ================== Frontend ===========================
import App from '@front/App.vue'
import Principal from '@pages/frontend/Principal.vue'
import Home from '@pages/frontend/Home.vue'
import Colaboradores from '@pages/frontend/Colaboradores.vue'
import Empregos from '@pages/frontend/Empregos.vue'
import Formacoes from '@pages/frontend/Formacoes.vue'
import Login from '@pages/frontend/Login.vue'
// ================== Backend ===========================
import Admin from '@back/App.vue'
import Dashboard from '@pages/backend/Dashboard.vue'
// import Login from '@compts/auth/Login.vue'

export default [
    //Admin Paths
    {
        path: '/admin',
        component: Admin,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: Dashboard
            }
        ]
    },
    //App Frontend Paths
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/',
                component: Principal,
                children: [
                    {
                        path: '/',
                        name: 'home',
                        component: Home
                    },{
                        path: '/empregos',
                        name: 'empregos',
                        component: Empregos
                    },{
                        path: '/formacoes',
                        name: 'formacoes',
                        component: Formacoes
                    },{
                        path: '/colaboradores',
                        name: 'colaboradores',
                        component: Colaboradores
                    },{
                        path: '/login',
                        name: 'login',
                        component: Login
                    }
                ]
            }
        ]
    }

]