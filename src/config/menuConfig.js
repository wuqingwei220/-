/*
* 导航菜单配置
*/
const menuList = [
    {
        title: '首页', //* 菜单标题名称
        key: 'home', //展开的key
        path: '/admin/home', //* 对应的path
        icon: 'home' //* 图标组件名称
    },
    {
        title: '商品',
        key: 'prod_about',
        path: '/admin/prod_about',
        icon: 'appstore',
        children: [ //* 子菜单列表
            {
                title: '商品分类管理',
                key: 'category',
                path: '/admin/prod_about/category',
                icon: 'unordered-list',
            },
            {
                title: '商品管理',
                key: 'product',
                path: '/admin/prod_about/product',
                icon: 'tool',
            }
        ]
    },
    {
        title: '用户管理',
        key: 'user',
        path: '/admin/user',
        icon: 'solution'
    },
    {
        title: '角色管理',
        key: 'role',
        path: '/admin/role',
        icon: 'user'
    },
    {
        title: '图形图表',
        key: 'charts',
        path: '/admin/charts',
        icon: 'area-chart',
        children: [
            {
                title: '柱形图',
                key: 'bar',
                path: '/admin/charts/bar',
                icon: 'bar-chart',
            },
            {
                title: '折线图',
                key: 'line',
                path: '/admin/charts/line',
                icon: 'line-chart',
            },
            {
                title: '饼图',
                key: 'pie',
                path: '/admin/charts/pie',
                icon: 'pie-chart',
            }
        ]
    },
]

export default menuList;
