const actions = {
  setSelectedStation ({commit}, station) {
    commit('setSelectedStation', station)
  },
  setStations ({commit}, stationList) {
    commit('setStations', stationList)
  },
  setStationStatue ({commit}, stationStatue) {
    commit('setStationStatue', stationStatue)
  }
}

export default actions
