import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    currentSideCard: 'toc',
    tocArray: [],
    siteInfo: {},
  },
  getters: {
    siteInfo: (state) => state.siteInfo,
    currentSideCard: (state) => state.currentSideCard,
    tocArray: (state) => state.tocArray,
  },
  mutations: {
    updateSiteInfo(state, payload) {
      state.siteInfo = payload
    },
    updateCurrentSideCard(state, payload) {
      state.currentSideCard = payload
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