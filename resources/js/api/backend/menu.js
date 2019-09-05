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
        role: 'admin'
    },

    // ===============================================
    {
        header: 'Serviços do Percursu'
    },
    {
        title: 'Percursu',
        group: 'percursu',
        icon: 'mdi-map-marker-path',
        role: 'manager',
        items: [{
            name: 'list-partners',
            title: 'Parceiros',
            component: 'list-partners',
            role: 'manager'
        }, {
            name: 'list-companies',
            title: 'Empresas',
            component: 'list-companies',
            role: 'manager'
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
        role: 'publisher',
        items: [{
            name: 'list-posts',
            title: 'Publicações',
            component: 'list-posts',
            role: 'publisher'
        },
        {
            name: 'list-categories',
            title: 'Categorias',
            component: 'list-categories',
            role: 'publisher'
        }, {
            name: 'list-tags',
            title: 'Marcadores',
            component: 'list-tags',
            role: 'publisher'
        },
        ]
    },
    {
        header: 'Sistema'
    }, {
        title: 'Sistema',
        group: 'system',
        icon: 'mdi-tune',
        role: 'admin',
        items: [{
            name: 'list-users',
            title: 'Utilizadores',
            component: 'list-users',
            role: 'admin'
        }, {
            name: 'list-roles',
            title: 'Funções',
            component: 'list-roles',
            role: 'super-admin'
        }, {
            name: 'list-permissions',
            title: 'Permissóes',
            component: 'list-permissions',
            role: 'super-admin'
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
        role: 'admin',
        items: [{
            name: 'entities',
            title: 'Entidades do sistema',
            component: 'entities',
            role: 'super-admin'
        }, {
            name: 'folks',
            title: 'Registos do pessoal',
            component: 'folks',
            role: 'admin'
        }, {
            title: 'Geral',
            icon: 'help',
            name: 'general',
            component: 'general',
            role: 'super-admin'
        }]
    },
    // ===============================================
    {
        title: 'Ajuda',
        group: 'extra',
        icon: 'mdi-help-box',
        name: 'help',
        role: ''
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
