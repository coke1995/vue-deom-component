import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: 'Index',
            component: () => import('../views/index.vue')
        },
        {
            path: "/collapse",
            name: 'Collapse',
            component: () => import('../views/collapse/index.vue')
        }
    ],
    mode: 'history'
})

export default router
