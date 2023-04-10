import axios from 'axios'
import config from './../config.js'
import { Notification } from 'element-ui'

export default {
    state: {
        listaVentas: [],
        listaServicios: [],
    },
    mutations: {
        setListaVentas: (state, value) => {
            state.listaVentas = value
        },
        setListaServicios: (state, value) => {
            state.listaServicios = value
        },

    },
    getters: {
        getListaVentas: (state) => {
            return state.listaVentas
        },
        getListaServicios: (state) => {
            return state.listaServicios
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

    }
}
