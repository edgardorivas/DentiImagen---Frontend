import axios from 'axios'
import config from './../config.js'
import { Notification } from 'element-ui'

export default {
    state: {
        listaPresupuestos: [],
        presupuesto:[],
        detallesPresupuesto: []
    },
    mutations: {
        setListaPresupuestos: (state, value) => {
            state.listaPresupuestos = value
        },
        setPresupuestos: (state, value) => {
            state.presupuesto = value
        },
        setDetallesPresupuestos: (state, value) => {
            state.detallesPresupuesto = value
        },
    },
    getters: {
        getListaPresupuestos: (state) => {
            return state.listaPresupuestos
        },
        getPresupuestos: (state) => {
            return state.presupuesto
        },
        getDetallesPresupuestos: (state) => {
            return state.detallesPresupuesto
        },
    },
    actions: {
        async listaPresupuestos(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/presupuesto',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setListaPresupuestos', resultado.data)
            } catch (error) {
                if (error.response) {
                    // Notification({
                    //   title: config.frontend.title,
                    //   message: error,
                    //   type: 'error'
                    // })
                    context.dispatch('getLoadingApp', false);
                    return error.response;
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setListaPresupuestos', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async presupuestosID(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/presupuesto/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setPresupuestos', resultado.data)
            } catch (error) {
                if (error.response) {
                    // Notification({
                    //   title: config.frontend.title,
                    //   message: error,
                    //   type: 'error'
                    // })
                    context.dispatch('getLoadingApp', false);
                    return error.response;
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setPresupuestos', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async detallesPresupuestosID(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/presupuesto/detalles/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setDetallesPresupuestos', resultado.data)
            } catch (error) {
                if (error.response) {
                    // Notification({
                    //   title: config.frontend.title,
                    //   message: error,
                    //   type: 'error'
                    // })
                    context.dispatch('getLoadingApp', false);
                    return error.response;
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setDetallesPresupuestos', [])
            }
            context.dispatch('getLoadingApp', false);
        },

    }
}
