import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue"
import Auth from "@/pages/Auth.vue"
import Main from "@/pages/Main.vue"
import vuex from "@/store/store.js"
import SignUp from "@/pages/SignUp.vue"
import UserProfile from "@/pages/UserProfile.vue"
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth,
    },
    {
        path: '/application',
        name: 'main',
        component: Main,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/signUp',
        name: 'sign-up',
        component: SignUp,
    },
    {
        path: '/user-profile',
        name: 'user-profile',
        component: UserProfile,
        meta: {
            requiresAuth: true
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next)=> {
    if(to.meta.requiresAuth && !vuex.state.auth.isAuthed){
        next('/auth')
    } else if ((to.path === '/auth' || to.path === '/signUp') && vuex.state.auth.isAuthed){
        next('/application')
    } else {
        next()
    }
})
export default router