import axios from 'axios'
import config from './../config.js'
import { Notification } from 'element-ui'

export default {
    state: {
        listaVentas: [],
        listaServicios: [],
        venta: [],
        detallesVenta: []

    },
    mutations: {
        setListaVentas: (state, value) => {
            state.listaVentas = value
        },
        setListaServicios: (state, value) => {
            state.listaServicios = value
        },

        setVentas: (state, value) => {
            state.venta = value
        },
        setDetallesVenta: (state, value) => {
            state.detallesVenta = value
        },

    },
    getters: {
        getListaVentas: (state) => {
            return state.listaVentas
        },
        getListaServicios: (state) => {
            return state.listaServicios
        },

        getVentas: (state) => {
            return state.venta
        },
        getDetallesVenta: (state) => {
            return state.detallesVenta
        },

    },
    actions: {
        async obtenerListaVentas(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/venta',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setListaVentas', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);
                    return false
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setListaVentas', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async obtenerListaServiciosTabla(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/servicios',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setListaServicios', resultado.data)
            } catch (error) {
                if (error.response) {
                    Notification({
                        title: config.frontend.title,
                        message: error,
                        type: 'error'
                    })
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setListaServicios', [])
            }
            context.dispatch('getLoadingApp', false);
        },

        async obtenerVenta(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/venta/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setVentas', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);
                    return false
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setVentas', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async obtenerDetallesVenta(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/venta/detalles/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setDetallesVenta', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);
                    return false
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setDetallesVenta', [])
            }
            context.dispatch('getLoadingApp', false);
        },

    }
}
