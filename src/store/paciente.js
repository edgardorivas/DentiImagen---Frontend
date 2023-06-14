import axios from 'axios'
import config from '../config.js'
import { Notification } from 'element-ui'
//trabajadorOdontologo
export default {
    state: {
        pacientes: [],
        paciente: {},
        historialTratamiento:[],
        usuariosOdontologicos: [],
        odontodiagramaIdPaciente: [],
        ultimoOdontodiagramaPaciente: null,
    },
    mutations: {
        setPacientes: (state, value) => {
            state.pacientes = value
        },
        setPaciente: (state, value) => {
            state.paciente = value
        },
        setHistorialTratamiento: (state, value) => {
            state.historialTratamiento = value
        },
        setUsuariosOdontologicos: (state, value) => {
            state.usuariosOdontologicos = value
        },
        setOdontodiagramaIdPaciente: (state, value) => {
            state.odontodiagramaIdPaciente = value
        },
        setUltimoOdontodiagramaPaciente: (state, value) => {
            state.ultimoOdontodiagramaPaciente = value
        },
    },
    getters: {
        getPacientes: (state) => {
            return state.pacientes
        },
        getPaciente: (state) => {
            return state.paciente
        },
        getHistorialTratamiento: (state, value) => {
            return state.historialTratamiento 
        },
        getUsuariosOdontologicos: (state) => {
            return state.usuariosOdontologicos
        },
        getOdontodiagramaIdPaciente: (state) => {
            return state.odontodiagramaIdPaciente
        },
        getUltimoOdontodiagramaPaciente: (state) => {
            return state.ultimoOdontodiagramaPaciente
        },
    },
    actions: {
        async obtenerListaDePacientes(context) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/paciente',
                    headers: {
                        ['auth-token']: token,
                    }
                });

                context.commit('setPacientes', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);
                    return false
                    // Notification({
                    //   title: config.frontend.title,
                    //   message: error.response.data.mensaje,
                    //   type: 'warning'
                    // })
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setPacientes', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async obtenerPacienteId({ dispatch, commit }, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'POST',
                    baseURL: config.backend.baseURL,
                    url: '/paciente/filtro',
                    headers: {
                        ['auth-token']: token,
                    },
                    data: payload,
                });
                if (resultado.data.data.length) {
                    commit('setPaciente', resultado.data.data[0])
                } else {
                    commit('setPaciente', null)
                }
            } catch (error) {
                if (error.response) {
                    // Notification({
                    //   title: config.frontend.title,
                    //   message: error,
                    //   type: 'error'
                    // })
                    dispatch('getLoadingApp', false);
                    return error.response
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                commit('setPaciente', null)
            }
            dispatch('getLoadingApp', false);
        },
        async obtenerListaDeTrabajadoresRol(context) {
            const token = localStorage.getItem('token_acess')
            context.dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: '/trabajadorRol',
                    headers: {
                        ['auth-token']: token,
                    }
                });

                context.commit('setUsuariosOdontologicos', resultado.data)
            } catch (error) {
                if (error.response) {
                    context.dispatch('getLoadingApp', false);

                    return error.response;
                    // Notification({
                    //   title: config.frontend.title,
                    //   message: error,
                    //   type: 'error'
                    // })
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                context.commit('setUsuariosOdontologicos', [])
            }
            context.dispatch('getLoadingApp', false);
        },
        async obtenerOdontodiagramaIdPaciente({ dispatch, commit }, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/odontodiagrama/pacinte/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                });
                if (resultado.data.data.length) {
                    commit('setOdontodiagramaIdPaciente', resultado.data.data)
                } else {
                    commit('setOdontodiagramaIdPaciente', null)
                }
            } catch (error) {
                if (error.response) {
                    // Notification({
                    //   title: config.frontend.title,
                    //   message: error,
                    //   type: 'error'
                    // })
                    dispatch('getLoadingApp', false);
                    return error.response
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                commit('setOdontodiagramaIdPaciente', null)
            }
            dispatch('getLoadingApp', false);
        },
        async obtenerUltimoOdontodiagrama({ dispatch, commit }, payload = { id: String }) {
          const token = localStorage.getItem('token_acess')
          dispatch('getLoadingApp', true);
          try {
            const resultado = await axios({
                method: 'GET',
                baseURL: config.backend.baseURL,
                url: '/odontodiagrama/paciente/ultimo/'+ payload.id,
                headers: {
                    ['auth-token']: token,
                }
            });
            commit('setUltimoOdontodiagramaPaciente', resultado.data.data)
          } catch (error) {
              if (error.response) {
                    dispatch('getLoadingApp', false);

                    return error.response;
                    //   Notification({
                    //     title: config.frontend.title,
                    //     message: error.response.data.mensaje,
                    //     type: 'warning'
                    //   })
              } else {
                  Notification({
                      title: config.frontend.title,
                      message: 'Error al acceder a internet',
                      type: 'error'
                  })
              }
            commit('setUltimoOdontodiagramaPaciente', null)
          }
          dispatch('getLoadingApp', false);
        },
        async obtenerHistorialTratamientoIdPaciente({ dispatch, commit }, payload = { id: String }) {
            const token = localStorage.getItem('token_acess')
            dispatch('getLoadingApp', true);
            try {
                const resultado = await axios({
                    method: 'GET',
                    baseURL: config.backend.baseURL,
                    url: `/historial-paciente/${payload.id}`,
                    headers: {
                        ['auth-token']: token,
                    },
                });
                if (resultado.data.data.length) {
                    commit('setHistorialTratamiento', resultado.data.data)
                } else {
                    commit('setHistorialTratamiento', null)
                }
            } catch (error) {
                if (error.response) {
                    // Notification({
                    //   title: config.frontend.title,
                    //   message: error,
                    //   type: 'error'
                    // })
                    dispatch('getLoadingApp', false);
                    return error.response
                } else {
                    Notification({
                        title: config.frontend.title,
                        message: 'Error al acceder a internet',
                        type: 'error'
                    })
                }
                commit('setHistorialTratamiento', null)
            }
            dispatch('getLoadingApp', false);
        },
    }
}
