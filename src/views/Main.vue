<template>
  <div class="row" id="map-chart-area">
    <div class="col-lg-12 col-md-12 alert-container">
      <Alert type="danger" :value="errMessage!=''">
        <i class="fa-lg fa fa-warning"></i> {{errMessage}}
      </Alert>
    </div>
    <div class="col-lg-2 col-md-2">
      <StationList :loading='loading'></StationList>
    </div>
    <div class="col-lg-6 col-md-10">
      <RailwayMap :loading='loading'></RailwayMap>
    </div>
    <div class="col-lg-4 col-md-12">
      <div class="row">
        <div class="col-md-12">
          <WindForecast :loading='loading'></WindForecast>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <ModelForecast :loading='loading'></ModelForecast>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StationList from '../components/Main/StationList'
  import RailwayMap from '../components/Main/RailwayMap'
  import WindForecast from '../components/Main/WindForecast'
  import ModelForecast from '../components/Main/ModelForecast'
  import connection from '../assets/js/connection'

  export default {
    name: 'main',
    components: {
      StationList,
      RailwayMap,
      WindForecast,
      ModelForecast,
    },
    data () {
      return {
        errMessage:'',
        loading:false
      }
    },
    methods: {
      setStationList(){
        this.apiPost(links.GET_STATIONS, '').then((res) => {
          this.handelResponse(res, (data) => {
            // this.$store.dispatch('setStations',data.stations)
            // this.$store.dispatch('setSelectedStation',data.stations[0].id)
            this.$store.commit('setStations',data.stations)
            this.$store.commit('setSelectedStation',data.stations[0].id)    //考虑到地图还得响应，最好还是用同步的方式更新
            this.setStationStatueList()
          }, (err) => {
            this.errMessage=this.handelError(err, 'data') + " ( 站点数据没有刷出来，没得玩了，刷新页面吧 )"
            this.loading=!this.loading
          })
        },(err)=>{
          this.errMessage=this.handelError(err,'network') + " ( 站点数据没有刷出来，没得玩了，刷新页面吧 )"
          this.loading=!this.loading
        })
      },
      setStationStatueList () {
        this.apiPost(links.GET_STATIONS_STATUE, '').then((res) => {
          this.handelResponse(res, (data) => {
            //this.$store.dispatch('setStationStatue',data.stations)
            this.$store.commit('setStationStatue',data.stations)       //考虑到地图还得响应，最好还是用同步的方式更新
            this.loading=!this.loading
          }, (err) => {
            this.errMessage=this.handelError(err, 'data') + " ( 站点状态没有刷出来 )"
            this.loading=!this.loading
          })
        },(err)=>{
          this.errMessage=this.handelError(err,'network') + " ( 站点状态没有刷出来 )"
          this.loading=!this.loading
        })
      }
    },
    created () {
      this.loading=!this.loading
      this.setStationList()
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('setStationStatue',[])
      this.$store.dispatch('setSelectedStation',null)
      next()
    },
    // mounted () {
    // },
    mixins: [connection]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
