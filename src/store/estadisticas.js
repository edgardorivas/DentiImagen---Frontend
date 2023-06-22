import axios from 'axios'
import config from './../config.js'
import { Notification } from 'element-ui'

export default {
    state: {
        estadisticaPaciente: [],
        estadisticaVenta: [],
        estadisticaPresupuesto: [],
        estadisticaCompra: [],
    },
    mutations: {
        setEstadisticaPaciente: (state, value) => {
            state.estadisticaPaciente = value
        },
        setEstadisticaVenta: (state, value) => {
            state.estadisticaVenta = value
        },
        setEstadisticaPresupuesto: (state, value) => {
            state.estadisticaPresupuesto = value
        },
        setEstadisticaCompra: (state, value) => {
            state.estadisticaCompra = value
        },
    },
    getters: {
        getEstadisticaPaciente: (state) => {
            return state.estadisticaPaciente
        },
        getEstadisticaVenta: (state) => {
            return state.estadisticaVenta
        },
        getEstadisticaPresupuesto: (state) => {
            return state.estadisticaPresupuesto
        },
        getEstadisticaCompra: (state) => {
            return state.estadisticaCompra
        },
    },
    actions: {
        async actionEstadisticas(context, payload = { fechaInicio: String, fechaFinal: String }) {
            if (!payload.fechaInicio || !payload.fechaFin) {
                const hoy = new Date();
                if (!payload.fechaInicio) {
                  payload.fechaInicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                }
                if (!payload.fechaFinal) {
                    payload.fechaFinal = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
                }
            }

            // Parsear datos
            payload.fechaInicio = payload.fechaInicio.toISOString().slice(0, 10);
            payload.fechaFinal = payload.fechaFinal.toISOString().slice(0, 10);
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: '/estadisticas',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                for (const estadistica of resultado.data.data) {
                    switch (estadistica.name) {
                        case 'paciente':
                            context.commit('setEstadisticaPaciente', estadistica.estadisticas)
                            break;
                        case 'venta':
                            context.commit('setEstadisticaVenta', estadistica.estadisticas)
                            break;
                        case 'presupuesto':
                            context.commit('setEstadisticaPresupuesto', estadistica.estadisticas)
                            break;
                        case 'compra':
                            context.commit('setEstadisticaCompra', estadistica.estadisticas)
                            break;

                        default:
                            break;
                    }
                }
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
                context.commit('setEstadisticaPaciente', [])
                context.commit('setEstadisticaVenta', [])
                context.commit('setEstadisticaPresupuesto', [])
                context.commit('setEstadisticaCompra', [])
            }
            context.dispatch('getLoadingApp', false);
        },
    }
}
