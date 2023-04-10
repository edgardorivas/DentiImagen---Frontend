import axios from 'axios'
import config from './../config.js'
import { Notification } from 'element-ui'

export default {
    state: {
        materialesProveedor: null,
        listaCompra: [],
        detallesCompra: [],
        detallesCompraMateriales: [],


    },
    mutations: {
        setMaterialesProveedor: (state, value) => {
            state.materialesProveedor = value
        },
        setListaCompra: (state, value) => {
            state.listaCompra = value
        },
        setDetallesCompra: (state, value) => {
            state.detallesCompra = value
        },
        setDetallesCompraMateriales: (state, value) => {
            state.detallesCompraMateriales = value
        },
    },
    getters: {
        getMaterialesProveedor: (state) => {
            return state.materialesProveedor
        },
        getListaCompra: (state) => {
            return state.listaCompra
        },
        getDetallesCompra: (state) => {
            return state.detallesCompra
        },
        getDetallesCompraMateriales: (state) => {
            return state.detallesCompraMateriales
        },
    },
    actions: {
        async obtenerMaterialesProveedor(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: `/recurso/proveedor/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setMaterialesProveedor', resultado.data)
            } catch (error) {
                if (error.response) {
                    // Notification({
                    //     title: config.frontend.title,
                    //     message: error,
                    //     type: 'error'
                    // })
                    context.dispatch('getLoadingApp', false);
                    return false
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setMaterialesProveedor', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async obtenerListaCompra(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/compra',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                context.commit('setListaCompra', resultado.data)
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
                context.commit('setListaCompra', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async obtenerDetallesCompras(context, payload = { id: String }){
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/compra/filtro/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                console.log(resultado)
                context.commit('setDetallesCompra', resultado.data)
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
                context.commit('setDetallesCompra', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async obtenerDetallesCompraMateriales(context, payload = { id: String }){
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/detallesCompra/filtro/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                console.log(resultado)
                context.commit('setDetallesCompraMateriales', resultado.data)
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
                context.commit('setDetallesCompraMateriales', [])
            }
            context.dispatch('getLoadingApp', false);
        }
    }
}
