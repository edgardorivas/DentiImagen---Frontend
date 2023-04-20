import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'

export default {
    state: {
        servicios: [],
        servicioEspecifico:[]
    },
    mutations: {
        setServicios: (state, value) => {
            state.servicios = value
        },
        setServicioEspecifico: (state, value) => {
            state.servicioEspecifico = value
        },
    },
    getters: {
        getServicios: (state) => {
            return state.servicios
        },
        getServicioEspecifico: (state) => {
            return state.servicioEspecifico
        },
    },
    actions: {
        async obtenerServicios(context) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/servicios',
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
    }
}
