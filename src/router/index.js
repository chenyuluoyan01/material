import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'denglu',
        component: () => import('../components/views/Login'),
    },
    // 后台管理路由
    {
        path: '/',
        name: '首页',
        component: () => import('../components/common/Home'),
        redirect: '/Classify',
        children: [
            {
                path: 'Classify',
                name: 'Classify',
                component: () => import('../components/views/Classify'),
            },
            {
                path: 'Brand',
                name: 'Brand',
                component: () => import('../components/views/Brand'),
            },
            {
                path: 'Material',
                name: 'Material',
                component: () => import('../components/views/Material'),
            },
            {
                path: 'Supplier',
                name: 'Supplier',
                component: () => import('../components/views/Supplier'),
            },
        ]
    },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
