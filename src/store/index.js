import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/utils/http'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage, // 默认是localstorage
    reducer (state) {
      // 默认是全部存储
      // 只存储返回的
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  state: {
    cityId: '310100',
    cityName: '上海',
    cinemaList: [],
    isTabbarShow: true
  },
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    changeCinemaData (state, data) {
      state.cinemaList = data
    },
    clearCinema (state) {
      state.cinemaList = []
    },
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }
  },
  actions: {
    getCinemaData ({ state, commit }, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=5121167`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  modules: {}
})
