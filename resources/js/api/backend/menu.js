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
        group: 'cms',
        icon: 'mdi-map-marker-path',
        items: [{
            name: 'list-partners',
            title: 'Parceiros',
            component: 'list-partners'
        }, {
            name: 'companies',
            title: 'Empresas',
            component: 'companies'
        } 
        ]
    },

    {
        header: 'CMS'
    },
    {
        title: 'Gestão de Conteúdos',
        group: 'cms',
        icon: 'mdi-application',
        items: [{
            name: 'list-posts',
            title: 'Publicações',
            component: 'list-posts'
        }, {
            name: 'categories',
            title: 'Categorias',
            component: 'categories'
        }, {
            name: 'tags',
            title: 'Marcadores',
            component: 'tags'
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
            name: 'roles',
            title: 'Funções',
            component: 'roles'
        }, {
            name: 'permissions',
            title: 'Permissóes',
            component: 'permissions'
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
