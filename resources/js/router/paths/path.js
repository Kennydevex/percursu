
// ==================  Geral  ===========================
// ================== Frontend ===========================
import App from '@front/App.vue'
import Principal from '@pages/frontend/Principal.vue'
import Home from '@pages/frontend/Home.vue'
import Colaboradores from '@pages/frontend/Colaboradores.vue'
import Empregos from '@pages/frontend/Empregos.vue'
import Formacoes from '@pages/frontend/Formacoes.vue'
import Login from '@pages/frontend/Login.vue'
import Register from '@pages/frontend/Register.vue'
import FrontPerfil from '@pages/frontend/Perfil.vue'
import BackPerfil from '@pages/backend/Perfil.vue'
// ================== Backend ===========================
import Admin from '@back/App.vue'
import Dashboard from '@pages/backend/Dashboard.vue'

import Partners from '@back/partners/Index.vue'
import ListPartners from '@back/partners/List.vue'
import CreatePartner from '@back/partners/Create.vue'
import Partner from '@back/partners/View.vue'
import UpdatePartner from '@back/partners/Update.vue'

import Users from '@back/users/Index.vue'
import ListUsers from '@back/users/List.vue'
import CreateUser from '@back/users/Create.vue'
import User from '@back/users/View.vue'
import UpdateUser from '@back/users/Update.vue'

import Posts from '@back/posts/Index.vue'
import ListPosts from '@back/posts/List.vue'
import CreatePost from '@back/posts/Create.vue'
import Post from '@back/posts/View.vue'
import UpdatePost from '@back/posts/Update.vue'
// import Login from '@compts/auth/Login.vue'

export default [
    //Admin Paths
    {
        path: '/admin',
        component: Admin,
        meta: {
            requiresAuth: true,
            breadcrumb: true,
        },
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: Dashboard,
                meta: {
                    breadcrumb: true,
                },
            },
            {
                path: '/perfil',
                name: 'back-perfil',
                component: BackPerfil
            },
            {
                path: '/parceiros',
                component: Partners,
                children: [
                    {
                        path: '/',
                        name: 'list-partners',
                        component: ListPartners
                    }, {
                        path: 'criar',
                        name: 'create-partner',
                        component: CreatePartner
                    }, {
                        path: 'editar',
                        name: 'update-partner',
                        component: UpdatePartner
                    }, {
                        path: 'ver',
                        name: 'view-partner',
                        component: Partner
                    },
                ]
            }, {
                path: '/utilizadores',
                component: Users,
                children: [
                    {
                        path: '/',
                        name: 'list-users',
                        component: ListUsers
                    }, {
                        path: 'criar',
                        name: 'create-user',
                        component: CreateUser
                    }, {
                        path: 'editar',
                        name: 'update-user',
                        component: UpdateUser
                    }, {
                        path: 'ver',
                        name: 'view-user',
                        component: User
                    },
                ]
            },
            {
                path: '/publicacoes',
                component: Posts,
                children: [
                    {
                        path: '/',
                        name: 'list-posts',
                        component: ListPosts
                    }, {
                        path: 'criar',
                        name: 'create-post',
                        component: CreatePost
                    }, {
                        path: 'editar',
                        name: 'update-post',
                        component: UpdatePost
                    }, {
                        path: 'ver',
                        name: 'view-post',
                        component: Post
                    },
                ]
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
                    }, {
                        path: '/registar',
                        name: 'register',
                        component: Register
                    }, {
                        path: '/meuperfil',
                        name: 'front-perfil',
                        component: FrontPerfil
                    }
                ]
            }
        ]
    }

]