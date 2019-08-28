// jshint esversion:6
// ==================  Geral  ===========================
// ================== Frontend ===========================
import App from '@front/App.vue';
import Principal from '@pages/frontend/Principal.vue';
import Home from '@pages/frontend/Home.vue';
import Colaboradores from '@pages/frontend/Colaboradores.vue';
import Empregos from '@pages/frontend/Empregos.vue';
import Formacoes from '@pages/frontend/Formacoes.vue';
import Noticias from '@pages/frontend/Noticias.vue';
import Login from '@pages/frontend/Login.vue';
import Register from '@pages/frontend/Register.vue';
import FrontPerfil from '@pages/frontend/Perfil.vue';
import FrontPartner from '@front/partners/View.vue';
// ================== Backend ===========================
import Admin from '@back/App.vue';
import Dashboard from '@pages/backend/Dashboard.vue';
import BackPerfil from '@pages/backend/Perfil.vue';

//Percursu
import Partners from '@back/percursu/partners/Index.vue';
import ListPartners from '@back/percursu/partners/List.vue';
import CreatePartner from '@back/percursu/partners/Create.vue';
import Partner from '@back/percursu/partners/View.vue';
import UpdatePartner from '@back/percursu/partners/Update.vue';

import Companies from '@back/percursu/companies/Index.vue';
import ListCompanies from '@back/percursu/companies/List.vue';


//System
import Users from '@back/system/users/Index.vue';
import ListUsers from '@back/system/users/List.vue';
import CreateUser from '@back/system/users/Create.vue';
import User from '@back/system/users/View.vue';
import UpdateUser from '@back/system/users/Update.vue';

import Permissions from '@back/system/permissions/Index.vue';
import ListPermissions from '@back/system/permissions/List.vue';

import Roles from '@back/system/roles/Index.vue';
import ListRoles from '@back/system/roles/List.vue';

//CMS
import Posts from '@back/cms/posts/Index.vue';
import ListPosts from '@back/cms/posts/List.vue';
import CreatePost from '@back/cms/posts/Create.vue';
import Post from '@back/cms/posts/View.vue';
import UpdatePost from '@back/cms/posts/Update.vue';

import Categories from '@back/cms/categories/Index.vue';
import ListCategories from '@back/cms/categories/List.vue';

import Tags from '@back/cms/tags/Index.vue';
import ListTags from '@back/cms/tags/List.vue';

//Settings

import Settings from '@back/settings/Index.vue';
import Folks from '@back/settings/folks/Index.vue';
import Entities from '@back/settings/entities/Index.vue';
import General from '@back/settings/general/Index.vue';


import Help from '@back/suport/helps/Index.vue';
// import Login from '@compts/auth/Login.vue'

export default [
    //Admin Paths
    {
        path: '/dashboard',
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
                        path: 'editar/:username',
                        name: 'update-partner',
                        component: UpdatePartner
                    }, {
                        path: 'ver/:username',
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
                        path: 'editar/:username',
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
                path: '/permissoes',
                component: Permissions,
                children: [
                    {
                        path: '/',
                        name: 'list-permissions',
                        component: ListPermissions
                    },
                ]
            },
            {
                path: '/papeis',
                component: Roles,
                children: [
                    {
                        path: '/',
                        name: 'list-roles',
                        component: ListRoles
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
            },
            {
                path: '/categorias',
                component: Categories,
                children: [
                    {
                        path: '/',
                        name: 'list-categories',
                        component: ListCategories
                    },
                ]
            },
            {
                path: '/empresas',
                component: Companies,
                children: [
                    {
                        path: '/',
                        name: 'list-companies',
                        component: ListCompanies
                    },
                ]
            },
            {
                path: '/marcadores',
                component: Tags,
                children: [
                    {
                        path: '/',
                        name: 'list-tags',
                        component: ListTags
                    },
                ]
            },

            {
                path: '/settings',
                component: Settings,
                children: [
                    {
                        path: 'registo_pessoal',
                        name: 'folks',
                        component: Folks
                    },
                    {
                        path: 'entidades',
                        name: 'entities',
                        component: Entities
                    },
                    {
                        path: 'geral',
                        name: 'general',
                        component: General
                    },
                ]
            },

            { path: '/ajuda', name: 'help', component: Help },
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
                    }, {
                        path: '/empregos',
                        name: 'empregos',
                        component: Empregos
                    }, {
                        path: '/formacoes',
                        name: 'formacoes',
                        component: Formacoes 
                    }, {
                        path: '/colaboradores',
                        name: 'colaboradores',
                        component: Colaboradores
                    }, 
                    {
                        path: '/noticias',
                        name: 'noticias',
                        component: Noticias
                    },
                    {
                        path: '/colaborador/:username',
                        name: 'view-front-partner',
                        component: FrontPartner
                    }, {
                        path: '/login',
                        name: 'login',
                        component: Login
                    }, {
                        path: '/registar',
                        name: 'register',
                        component: Register
                    }, {
                        path: '/perfil/:username',
                        name: 'front-perfil',
                        component: FrontPerfil
                    }
                ]
            }
        ]
    }

];