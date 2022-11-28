import Vue from 'vue'
import Vuex from 'vuex'

import loading from './loading';
import usuarios from './usuarios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loading,
    usuarios,
  }
})
