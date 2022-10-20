import { Loading } from 'element-ui'

export default {
  state: {
    LoadingApp: Loading.service({
      body: false,
      fullscreen: false,
      lock: false,
      text: null,
      spinner: 'null',
      background: '',
    }),
    estatus: false
  },
  mutations: {
    setLoadingApp: (state, value) => {
      state.LoadingApp = value
      state.estatus = value ? true : false
    }
  },
  getters: {
    getLoadingApp: (state) => {
      return state.LoadingApp
    }
  },
  actions: {
    getLoadingApp (context, value) {
      if (value) {
        context.commit('setLoadingApp', Loading.service({
          lock: false,
          text: 'CARGANDO...',
          spinner: 'el-icon-loading',
          background: 'rgb(247 250 252 / 83%)'
        }))
      } else {
        context.commit('setLoadingApp', Loading.service().close())
      }
    }
  }
}
