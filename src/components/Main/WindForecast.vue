<template>
  <div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title"><i class="fa fa-line-chart"></i> 阵风预报曲线</h3>
    </div>
    <div class="panel-body">
        <div class="alert-container">
          <Alert type="danger" :value="errMessage!=''">
            <i class="fa-lg fa fa-warning"></i> {{errMessage}}
          </Alert>
        </div>
        <div id="forcastChart" class="chart-area">
          <Spinner class='spin-background' v-if='loading | dataLoading'></Spinner>
          <IEcharts class='chart' :option="line" :notMerge='true' :resizable='true' @ready="onReady" @click="onClick"></IEcharts>
        </div>
        <div class="row mt10">
            <div class="col-md-3 col-sm-3 col-xs-6 text-center">
                <span class="label label-primary">最大风速</span>
                <p class="chart-mark"><Tween :value='maxValue'></Tween> m/s</p>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-6 text-center">
                <span class="label label-success">平均风速</span>
                <p class="chart-mark"><Tween :value='aveValue'></Tween> m/s</p>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-6 text-center">
                <span class="label label-limit">减速达标率</span>
                <p class="chart-mark"><Tween :value='limitCount'></Tween> %</p>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-6 text-center">
                <span class="label label-stop">停车达标率</span>
                <p class="chart-mark"><Tween :value='stopCount'></Tween> %</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  // import IEcharts from 'vue-echarts-v3/src/full'
  import IEcharts from 'vue-echarts-v3'
  import defaultOption from 'assets/js/chartDefaultOption'
  import connection from 'assets/js/connection'
  import Alert from 'vue-strap/src/alert'
  import Tween from 'components/Tween'
  import Spinner from 'vue-simple-spinner'

  export default {
    name: 'windForecast',
    components: {
      IEcharts,
      Alert,
      Tween,
      Spinner
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
        line: defaultOption,
        errMessage:'',
        maxValue:0,
        aveValue:0,
        stopCount:0,
        limitCount:0
      }
    },
    methods: {
      onReady (instance) {
        // console.log("%cecharts ready", "color:#00ff00")
      },
      onClick (event, instance, echarts) {
        // console.log(arguments)
      },
      updateChart (val){
        if(val){
          this.dataLoading=true
          this.errMessage=''
          this.apiPost(links.GET_GUSTWIND, {"stationId":val}).then((res) => {
            this.handelResponse(res, (data) => {
              this.dataLoading=false
              //这里开始处理曲线图
              var maxValueTemp=0,aveValueTemp=0,stopCountTemp=0,limitCountTemp=0;
              for(var i=0;i<data.data.length;i++){
                  aveValueTemp+=Number(data.data[i]);
                  maxValueTemp=Math.max(data.data[i],maxValueTemp);
                  if(data.data[i]>=16)
                      stopCountTemp++;
                  else if(data.data[i]>=20)
                      limitCountTemp++;
              }
              this.maxValue=maxValueTemp
              this.aveValue=aveValueTemp/data.data.length;
              this.stopCount=stopCountTemp*100/data.data.length;
              this.limitCount=limitCountTemp*100/data.data.length;

              var line=_.assign({},defaultOption,{
                title:{
                  text: data.stationName+'阵风预报',
                  subtext:data.subTitle
                },
                legend: {
                  left: 'center',
                  data: ['阵风风速']
                },
                xAxis:{
                  boundaryGap: false,
                  data:data.time
                },
                series:[{
                  name: '阵风风速',
                  type: 'line',
                  data: data.data,
                  showAllSymbol:true,
                  itemStyle:{
                    normal:{
                      color:function(params){
                        var value=params.value;
                        if(value>=data.stopNum)
                          return '#d91e18';
                        else if(value>=data.limitNum)
                          return '#ff9347';
                        return defaultOption.color[0];
                      }
                    }
                  },
                  lineStyle:{
                    normal:{
                      color:defaultOption.color[0]
                    }
                  },
                  markPoint: {
                    data: [
                      //{type: 'max', name: '最大值'},
                      //{type: 'min', name: '最小值'}
                    ]
                  }
                },{
                  name:'停车预警线',
                  type:'line',
                  markLine:{
                    lineStyle:{
                      normal:{
                        type:'solid',
                        color:'#d91e18'
                      }
                    },
                    data:[
                      {type:'min'},
                      {yAxis:data.stopNum,name:'停车风速'}
                    ]
                  }
                },{
                  name:'减速预警线',
                  type:'line',
                  markLine:{
                    lineStyle:{
                      normal:{
                        type:'solid',
                        color:'#ff9347'
                      }
                    },
                    data:[
                      {type:'min'},
                      {yAxis:data.limitNum,name:'减速风速'}
                    ]
                  }
                }]
              })
              this.line=line
            }, (err) => {
              this.dataLoading=false
              this.errMessage=this.handelError(err, 'data')
            })
          },(err)=>{
            this.dataLoading=false
            this.errMessage=this.handelError(err,'network')
          })
        }else{
          this.line=defaultOption
        }
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
        this.updateChart(val)
      },
      getStations(stations){
      }
    },
    mounted () {
    },
    mixins: [connection]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
