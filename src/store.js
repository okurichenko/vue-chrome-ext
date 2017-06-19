import Vue from 'vue'
import Vuex from 'vuex'
import VuexFire from 'vuexfire'
import firebaseApp from './firebase.js'

Vue.use(Vuex)
Vue.use(VuexFire)

const db = firebaseApp.database()

export default new Vuex.Store({
  state: {
    rooms: null,
    user: null,
    company: null
  },
  mutations: {
    ...VuexFire.mutations
  },
})
