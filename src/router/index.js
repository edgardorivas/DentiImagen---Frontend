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
        component: () => import('../views/auth/login.vue'),
        meta: {
          noAuth: true
        }
      },
      {
        path: '/auth/recuperar',
        name: 'Recuperacion de cuenta',
        component: () => import('../views/auth/recuperar.vue'),
        meta: {
          noAuth: true
        }
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
        name: 'Lista de Usuarios',
        component: () => import('../views/admin/Usuarios/Lista.vue'),
      },
      {
        path: "/admin/usuario/agregar",
        name: 'Registro de Usuario',
        component: () => import('../views/admin/Usuarios/Registro.vue'),
      },
      {
        path: "/admin/usuarios/:ID",
        name: 'Editar Usuario',
        component: () => import('../views/admin/Usuarios/Editar.vue'),
      },
      //edgardo

      //materiales
      {
        path: "/admin/materiales",
        name: 'Lista de materiales',
        component: () => import('../views/admin/materiales/lista.vue'),
      },
      {
        path: "/admin/materiales/agregar",
        name: 'Registro de materiales',
        component: () => import('../views/admin/materiales/registro.vue'),
      },
      {
        path: "/admin/materiales/:ID",
        name: 'Editar materiales',
        component: () => import('../views/admin/materiales/Editar.vue'),
      },
      //tipo-materiales
      {
        path: "/admin/tipo-materiales",
        name: 'Lista de tipos de materiales',
        component: () => import('../views/admin/materiales/tipoMateriales/lista.vue'),
      },
      {
        path: "/admin/tipo-materiales/agregar",
        name: 'Agregar tipos de materiales',
        component: () => import('../views/admin/materiales/tipoMateriales/registro.vue'),
      },
      {
        path: "/admin/tipo-materiales/:ID",
        name: 'Editar tipos de materiales',
        component: () => import('../views/admin/materiales/tipoMateriales/editar.vue'),
      },
      //proveedores
      {
        path: "/admin/proveedores",
        name: 'Lista de proveedores',
        component: () => import('../views/admin/proveedores/lista.vue'),
      },
      {
        path: "/admin/proveedores/agregar",
        name: 'Agregar Proveedores',
        component: () => import('../views/admin/proveedores/registro.vue'),
      },
      {
        path: "/admin/proveedores/:ID",
        name: 'Editar Proveedores',
        component: () => import('../views/admin/proveedores/editar.vue'),
      },
      //fin
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
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name: 'Cerrar Sesion',
    component: () => import('./../views/auth/logout.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    name: 'Error 404',
    component: () => import('./../views/error404.vue'),
    meta: {
      requiresAuth: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active is-active',
  routes
})

router.beforeEach(async (to, from, next) => {
  const user = localStorage.getItem('token_acess')
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const noAuth = to.matched.some(x => x.meta.noAuth)

  if (noAuth) {
    if (user) {
      next(`/admin`)
    } else {
      next()
    }
  } else if (requiresAuth && !user) {
    next(`/auth/login`)
  } else {
    next()
  }
})

export default router
