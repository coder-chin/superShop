import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
