import Vue from 'vue'
import VueRouter from 'vue-router'
// import datePicker from '@/components/datePicker.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'datePicker',
        component: () => import('@/components/datePicker.vue')
    },
    {
        path: '/autoRolling',
        name: 'autoRolling',
        component: () => import('@/components/autoRolling.vue')
    },
    {
        path: '/lazyLoadImg',
        name: 'lazyLoadImg',
        component: () => import('@/components/lazyLoadImg.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
