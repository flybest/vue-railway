<template>
  <div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title"><i class="fa fa-map-marker"></i> 铁路地图</h3>
    </div>
    <div class="panel-body">
        <div class="alert-container">
          <Alert type="danger" :value="errMessage!=''">
            <i class="fa-lg fa fa-warning"></i> {{errMessage}}
          </Alert>
          <!-- <span class="stations"></span>
          <span class="statue"></span>
          <span class="windpic"></span> -->
        </div>
        <div id="map" class="map">
          <Spinner class='spin-background' v-if='loading | dataLoading' :line-size="5" :line-bg-color="'rgba(255, 255, 255, 0.5)'"></Spinner>
        </div>
    </div>
  </div>
</template>

<script>
  require('plugins/leaflet')
  require('plugins/leafletPlayback')
  require('plugins/leafletMapCarousel')
  import leafletMap from 'assets/js/map'
  import connection from 'assets/js/connection'

  export default {
    name: 'railwayMap',
    components: {
    },
    props:{
      loading:{
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
        dataLoading: false,
        errMessage:'',
      }
    },
    created(){
      this.dataLoading=!this.dataLoading
    },
    mounted (){
      this.llMap = new leafletMap('map')
      this.llMap.selectMarkerCB = this.setActiveStation
      this.setRailway()

      //console.log(this.$store.getters.getSelectedStation)
      //this.llMap.updateStation(this.$store.getters.getStations)
    },
    methods:{
      setRailway(){
        this.apiGet('static/data/simul_railway.json', '').then((res) => {
          this.llMap.updateRailway(res)
          this.dataLoading=!this.dataLoading
        },(err)=>{
            this.errMessage=this.handelError(err,'network') + ' 加载线路数据失败'
            this.dataLoading=!this.dataLoading
        })
      },
      setActiveStation (id) {
        // this.$store.commit('setSelectedStation', id)
        this.$store.dispatch('setSelectedStation',id)
        //上面两种方法都可以，一个直接调用mutation，一个分发action，按照官方说法，mutation只能同步，action可以异步，但是这里没有区别
      }
    },
    computed:{
      getActiveStation(){
        return this.$store.getters.getSelectedStation
      },
      getStations(){
        return this.$store.getters.getStations
      }
    },
    watch:{
      getActiveStation(val){
        //setTimeout(this.llMap.selectMarker(val),50)
        this.llMap.selectMarker(val)
      },
      getStations(stations){
        //setTimeout(this.llMap.updateStation(stations),30)
        this.llMap.updateStation(stations)
        this.llMap.selectMarker(this.$store.getters.getSelectedStation)
      }
    },
    mixins: [connection]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>




