import pageRoutes from './router.config'

export default {
    //singular: true,
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: {
                hmr: true,
            },
            locale: {
                default: 'zh-CN', //默认语言 zh-CN
                baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
                antd: true // 是否启用antd的<LocaleProvider />
            }
        }],
    ],
    //路由配置
    routes: pageRoutes,
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
    },
    // dynamicImport: {
    //     loadingComponent: './components/PageLoading/index',
    //     webpackChunkName: true,
    //     level: 3,
    // },
};