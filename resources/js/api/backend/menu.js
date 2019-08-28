// jshint esversion:6
const Menu = [
    // ===============================================
    {
        header: 'Genéricos'
    }, {
        title: 'Dashboard',
        group: 'general',
        icon: 'mdi-view-dashboard-variant',
        name: 'dashboard',
    },

    // ===============================================
    {
        header: 'Serviços do Percursu'
    },
    {
        title: 'Percursu',
        group: 'percursu',
        icon: 'mdi-map-marker-path',
        items: [{
            name: 'list-partners',
            title: 'Parceiros',
            component: 'list-partners'
        }, {
            name: 'list-companies',
            title: 'Empresas',
            component: 'list-companies'
        }
        ]
    },

    {
        header: 'CMS'
    },
    {
        title: 'Conteúdos',
        group: 'cms',
        icon: 'mdi-application',
        items: [{
            name: 'list-posts',
            title: 'Publicações',
            component: 'list-posts'
        },
        {
            name: 'list-categories',
            title: 'Categorias',
            component: 'list-categories'
        }, {
            name: 'list-tags',
            title: 'Marcadores',
            component: 'list-tags'
        },
        ]
    },
    {
        header: 'Sistema'
    }, {
        title: 'Sistema',
        group: 'system',
        icon: 'mdi-tune',
        items: [{
            name: 'list-users',
            title: 'Utilizadores',
            component: 'list-users'
        }, {
            name: 'list-roles',
            title: 'Funções',
            component: 'list-roles'
        }, {
            name: 'list-permissions',
            title: 'Permissóes',
            component: 'list-permissions'
        },]
    },
    {
        divider: true
    },
    {
        header: 'Parâmetros e Suporte'
    }, {
        title: 'Configuração',
        group: 'settings',
        component: 'settings',
        icon: 'mdi-settings',
        items: [{
            name: 'entities',
            title: 'Entidades do sistema',
            component: 'entities'
        }, {
            name: 'folks',
            title: 'Registos do pessoal',
            component: 'folks'
        }, {
            title: 'Geral',
            icon: 'help',
            name: 'general',
            component: 'general'
        }]
    },
    // ===============================================
    {
        title: 'Ajuda',
        group: 'extra',
        icon: 'mdi-help-box',
        name: 'help',
    },
];
// reorder menu
Menu.forEach((item) => {
    if (item.items) {
        item.items.sort((x, y) => {
            let textA = x.title.toUpperCase();
            let textB = y.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
});

export default Menu;
