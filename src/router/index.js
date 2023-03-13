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
      //recibos de compra
      {
        path: "/admin/recibo/compra/agregar",
        name: 'Agregar recibo de compra',
        component: () => import('../views/admin/recibos/compra/registro.vue'),
      },
      {
        path: "/admin/recibo/compra/lista",
        name: 'Listar recibos de compra',
        component: () => import('../views/admin/recibos/compra/lista.vue'),
      },
      //inventario
      {
        path: "/admin/inventario",
        name: 'Lista de inventario',
        component: () => import('../views/admin/inventario/listar.vue'),
      },

      //recibos de ventas
      {
        path: "/admin/recibo/venta/agregar",
        name: 'Agregar recibo de Venta',
        component: () => import('../views/admin/recibos/venta/registro.vue'),
      },
      {
        path: "/admin/recibo/venta/lista",
        name: 'Listar recibos de Venta',
        component: () => import('../views/admin/recibos/venta/lista.vue'),
      },
      //Paciente
      {
        path: "/admin/paciente/agregar",
        name: 'Agregar un nuevo paciente',
        component: () => import('../views/admin/paciente/registro.vue'),
      },
      {
        path: "/admin/paciente/lista",
        name: 'Lista de Pacientes',
        component: () => import('../views/admin/paciente/lista.vue'),
      },
      {
        path: "/admin/paciente/id/:ID",
        name: 'Detalles del Paciente',
        component: () => import('../views/admin/paciente/editar.vue'),
      },
      // Odontodiagrama
      {
        path: "/admin/odontodiagrama/registro",
        name: 'Nuevo Odontodiagrama',
        component: () => import('../views/admin/odontodiagrama/Registro.vue'),
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
