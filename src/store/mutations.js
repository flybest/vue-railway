const mutations = {
  setSelectedStation (state, station) {
    state.selectedStation = station
  },
  setStations (state, stationList ){
    state.stationList = stationList.map((value,index)=>{
      var station = value
      station['statue'] = 1
      return station
    })
  },
  setStationStatue(state, stationStatue){
    var stationList = []
    stationList = stationStatue.map(({id, statue})=>{
      const station = state.stationList.find(s => s.id === id)
      station['statue']=statue
      return station
    })
    state.stationList=stationList
  }
}

export default mutations
