import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    redirect: '/auth/login',
    name: 'Contenedor de login',
    component: () => import('../views/auth/contenedor.vue'),
    children: [
      {
        path: '/auth/login',
        name: 'Login de usuario',
        component: () => import('../views/auth/login.vue')
      },
      {
        path: '/auth/recuperar',
        name: 'Recuperacion de cuenta',
        component: () => import('../views/auth/recuperar.vue')
      },
    ],
  },
  {
    path: '*',
    name: 'Error 404',
    component: () => import('./../views/error404.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active is-active',
  routes
})

export default router
