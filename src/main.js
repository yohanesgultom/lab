import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

import vuetify from './plugins/vuetify';
import store from './store'
import axios from 'axios'
import VueGtag from "vue-gtag"

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(VueGtag, {
    config: { id: process.env.VUE_APP_ANALYTICS_ID }
})

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App),
    created() {
        window.addEventListener('offline', () => {
            store.commit('update', { online: false })
        })
        window.addEventListener('online', () => {
            store.commit('update', { online: true })
        })
    }
}).$mount('#app')