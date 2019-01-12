import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    currentSideCard: 'toc',
    needFixed: false,
    tocArray: [],
    siteInfo: {},
  },
  getters: {
    siteInfo: (state) => state.siteInfo,
    currentSideCard: (state) => state.currentSideCard,
    needFixed: (state) => state.needFixed,
    tocArray: (state) => state.tocArray,
  },
  mutations: {
    updateSiteInfo(state, payload) {
      state.siteInfo = payload
    },
    updateCurrentSideCard(state, payload) {
      state.currentSideCard = payload
    },
    updateNeedFixed(state, payload) {
      state.needFixed = payload
    },
    updateTocArray(state, payload) {
      state.tocArray = payload
    },
  },
  actions: {
    async nuxtServerInit({ commit }, { app }) {
      const result = await app.$axios.$get('/api/blog/siteInfo')
      commit('updateSiteInfo', result.data)
      return result
    },
  }
})

export default store