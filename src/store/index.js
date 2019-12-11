import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    online: navigator.onLine,
    alertMessage: false,
    overlay: false,
  }
}

const defaultState = getDefaultState()

export default new Vuex.Store({
  state: defaultState,
  mutations: {
    update (state, payload){      
      state = Object.assign(state, payload)
    },
    reset (state){
      Object.assign(state, getDefaultState())
    }
  },
})
