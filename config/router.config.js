export default [{
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
        {path: '/user', redirect: '/user/login'},
        {path: '/user/login', component: './user/login', name: 'login'},
        {path: '/user/register', component: './user/regist', name: 'regist'},
        {component: '404'},
    ]
},{
    path:'/',
    component:'../layouts/BaseLayout',
}]