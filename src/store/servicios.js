import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
    state: {
        servicios: [],
        servicioEspecifico:[],
        servicioInsumoEspecifico:[],
        servicioInsumo:[]
    },
    mutations: {
        setServicios: (state, value) => {
            state.servicios = value
        },
        setServicioEspecifico: (state, value) => {
            state.servicioEspecifico = value
        },
        setServicioInsumoEspecifico: (state, value) => {
            state.servicioInsumoEspecifico = value
        },
        setServicioInsumo: (state, value) => {
            state.servicioInsumo = value
        },
    },
    getters: {
        getServicios: (state) => {
            return state.servicios
        },
        getServicioEspecifico: (state) => {
            return state.servicioEspecifico
        },
        getServicioInsumoEspecifico: (state) => {
            return state.servicioInsumoEspecifico
        },
        getServicioInsumo: (state) => {
            return state.servicioInsumo
        },
    },
    actions: {
        async obtenerServicios(context,lote=0) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/servicios?lote=${lote}`,
                    headers: {
                        ['auth-token']: token,
                    }
                });

                context.commit('setServicios', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);

                    return false
                    /*Notification({
                      title: config.frontend.title,
                      message: error.response.data.mensaje,
                      type: 'warning'
                    })*/
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setServicios', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async obtenerServiciosMateriales(context,lote=0) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `servicios-recurso/mostrar?lote=${lote}`,
                    headers: {
                        ['auth-token']: token,
                    }
                });

                context.commit('setServicioInsumo', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);

                    return false
                    /*Notification({
                      title: config.frontend.title,
                      message: error.response.data.mensaje,
                      type: 'warning'
                    })*/
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setServicioInsumo', [])
            }
            context.dispatch('getLoadingApp', false);
        },

        async obtenerServiciosEspecifico(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/servicios/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    }
                });

                context.commit('setServicioEspecifico', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);

                    return false
                    /*Notification({
                      title: config.frontend.title,
                      message: error.response.data.mensaje,
                      type: 'warning'
                    })*/
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setServicioEspecifico', [])
            }
            context.dispatch('getLoadingApp', false);
        },

        async obtenerServiciosMaterialesEspecifico(context, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/servicios-recurso/mostrar/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    }
                });

                context.commit('setServicioInsumoEspecifico', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);

                    return false
                    /*Notification({
                      title: config.frontend.title,
                      message: error.response.data.mensaje,
                      type: 'warning'
                    })*/
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setServicioInsumoEspecifico', [])
            }
            context.dispatch('getLoadingApp', false);
        },
    }
}
