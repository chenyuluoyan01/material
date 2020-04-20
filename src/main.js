import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import request from './network/request'
import ElementUI from 'element-ui'
import animated from 'animate.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import './assets/css/index.styl'
import './assets/css/main.css'
Vue.config.productionTip = false
Vue.use(ElementUI, Vuex, animated)

Vue.prototype.post = request.post
Vue.prototype.get = request.get

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
