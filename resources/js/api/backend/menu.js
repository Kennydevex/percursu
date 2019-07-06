const Menu = [
    // ===============================================
    {
        header: 'Genéricos'
    }, {
        title: 'Dashboard',
        group: 'general',
        icon: 'mdi-monitor-dashboard',
        name: 'dashboard',
    }, 

    // ===============================================
    {
        header: 'Aplicação e Conteúdos'
    }, 
    {
        title: 'Gestão de Conteúdos',
        group: 'cms',
        icon: 'mdi-newspaper',
        items: [{
                name: 'articles',
                title: 'Artigos',
                component: 'articles'
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
        component: 'system',
        icon: 'mdi-tune',
        items: [{
            name: 'users',
            title: 'Utilizadores',
            component: 'users'
        }, {
            name: 'roles',
            title: 'Funções',
            component: 'roles'
        }, {
            name: 'permissions',
            title: 'Permissóes',
            component: 'permissions'
        }, ]
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
