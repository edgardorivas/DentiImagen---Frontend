import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
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
    path: '/admin',
    redirect: '/admin/dashboard',
    component: () => import('../layouts/Admin.vue'),
    children: [
      {
        path: "/admin/dashboard",
        component: () => import('../views/admin/Dashboard.vue'),
      },
      {
        path: "/admin/usuarios",
        component: () => import('../views/admin/Usuarios.vue'),
      },
      {
        path: "/admin/configuraciones",
        component: () => import('../views/admin/Settings.vue'),
      },
      {
        path: "/admin/tables",
        component: () => import('../views/admin/Tables.vue'),
      },
      {
        path: "/admin/maps",
        component: () => import('../views/admin/Maps.vue'),
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
