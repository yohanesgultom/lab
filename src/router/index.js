import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Home', icon: 'mdi-home' },
    },
    {
        path: '/passgen',
        name: 'passgen',
        component: () =>
            import ( /* webpackChunkName: "passgen" */ '../views/PassGen.vue'),
        meta: { title: 'Password Generator', icon: 'mdi-shield-key' },
    },
    {
        path: '/qrscan',
        name: 'qrscan',
        component: () =>
            import ( /* webpackChunkName: "qrscan" */ '../views/QRScanner.vue'),
        meta: { title: 'QR Scanner', icon: 'mdi-qrcode-scan' },
    },
    {
        path: '/xlsx',
        name: 'xlsx',
        component: () =>
            import ( /* webpackChunkName: "xlsx" */ '../views/Xlsx.vue'),
        meta: { title: 'XLSX Parser', icon: 'mdi-file' },
    },
    {
        path: '/emoji',
        name: 'emoji',
        component: () =>
            import ( /* webpackChunkName: "emoji" */ '../views/Emoji.vue'),
        meta: { title: 'Emoji Converter', icon: 'mdi-emoticon-cool-outline' },
    },
    {
        path: '/ethereum',
        name: 'ethereum',
        component: () =>
            import ( /* webpackChunkName: "ethereum" */ '../views/Ethereum.vue'),
        meta: { title: 'Ethereum Integration', icon: 'mdi-ethereum' },
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    router.app.$gtag.event(to.name)
    next()
})

export default router