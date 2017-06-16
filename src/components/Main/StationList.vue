<template>
  <div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title"><i class="fa fa-exclamation-triangle"></i> 预警站点</h3>
    </div>
    <div class="panel-body">
      <div class="alert-container">
      </div>
      <div class="station-list-container" id="station-list">
          <Spinner class="spin-background" v-if="loading" :line-size="5" :line-bg-color="'rgba(255, 255, 255, 0.5)'"></Spinner>
          <ul class="ul-blank">
            <li v-for="station in getStationList">
              <a class="station-label btn btn-outline" :class="{'red':station.statue == 3,'yellow-gold':station.statue == 2, 'blue':station.statue == 1,'active': station.id == getActiveStation}" :data-item="station.id" @click="setActiveStation(station.id)">
                <div class="pull-left">
                  <img class="img-statue" :src="'static/img/'+station.statue+'.gif'">
                </div>
                <span>{{station.name}}</span>
              </a>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  require('plugins/jquery.slimscroll.min.js')

  export default {
    name: 'stationList',
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
        showSpin:this.loading
      }
    },
    methods: {
      setActiveStation (id) {
        // this.$store.commit('setSelectedStation', id)
        this.$store.dispatch('setSelectedStation',id)
        //上面两种方法都可以，一个直接调用mutation，一个分发action，按照官方说法，mutation只能同步，action可以异步，但是这里没有区别
      }
    },
    computed: {
      ...mapGetters({
        getActiveStation: 'getSelectedStation',
        getStationList:'getStations'
      })
      // getActiveStation(){
      //   return this.$store.getters.getSelectedStation
      // }
      //上面两种方法都可以，一种是建立映射关系，一种是直接从getter获取值
      //经过测试，尽管只有一个对象，mapGetter前面的对应关系符号不能删除，不然只能将mapGetter整体赋值给computer属性，具体参见vuex官网例子购物车
    },
    mounted () {
      jQuery('#station-list').slimScroll({
        height: '770px'
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
