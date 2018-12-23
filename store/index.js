import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    currentSideCard: 'toc',
    tocArray: [],
  },
  getters: {
    currentSideCard: (state) => state.currentSideCard,
    tocArray: (state) => state.tocArray,
  },
  mutations: {
    updateCurrentSideCard(state, payload) {
      state.currentSideCard = payload
    },
    updateTocArray(state, payload) {
      state.tocArray = payload
    },
  }
})

export default store