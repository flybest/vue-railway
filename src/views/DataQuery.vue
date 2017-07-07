<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title"><i class="fa fa-database"></i> 数据管理</h3>
    </div>
      <div class="panel-body">
        <tabs>
          <tab header="站点预报">
            <div class="table-container">
              <ServerTable ref="ftable" :source="fsource" :columns="fcolumns" :translation="translation" :limits="limits" :show-filter="false">
                <div slot="filterAction" class="table-group-actions">
                  <form class="form-inline">
                    <div class="form-group">
                      <div class="btn-group" data-toggle="buttons">
                        <label class="btn blue" :class="{'active':this.fcstType==1}">
                          <input type="radio" name="forcast-type" id="option1" autocomplete="off" value="1" v-model="fcstType"> 模式预报
                        </label>
                        <label class="btn blue" :class="{'active':this.fcstType==2}">
                          <input type="radio" name="forcast-type" id="option2" autocomplete="off" value="2" v-model="fcstType"> 阵风预报
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="forcast-time">起报时间：</label>
                      <div class="input-group">
                        <!-- <input type="text" id="forcast-time" class="form-control full-line" readonly v-model="fcstTime"> -->
                        <DatePicker v-model="fcstTime" :class="'full-line'" :config="pickerOption" :readOnly="true" ></DatePicker>
                        <span class="input-group-addon date-reset" @click="clearTime('fcstTime')"><i class="glyphicon glyphicon-remove"></i></span>
                      </div>
                    </div>
                    <button type="button" class="btn green-sharp table-group-action-submit" @click="getTableData('ftable')"><i class="fa fa-search"></i> 搜索</button>
                  </form>
                </div>
              </ServerTable>
            </div>
          </tab>
          <tab header="站点实况">
            <div class="table-container">
              <ServerTable ref="ltable" :source="lsource" :columns="lcolumns" :translation="translation" :limits="limits" :show-filter="false">
                <div slot="filterAction" class="table-group-actions">
                  <form class="form-inline">
                    <div class="form-group">
                      <label for="start-time">开始时间：</label>
                      <div class="input-group">
                        <!-- <input type="text" id="start-time" class="form-control full-line" readonly v-model="startTime"> -->
                        <DatePicker v-model="startTime" :class="'full-line'" :config="pickerOption" :readOnly="true" ></DatePicker>
                        <span class="input-group-addon date-reset" @click="clearTime('startTime')"><i class="glyphicon glyphicon-remove"></i></span>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="end-time">结束时间：</label>
                      <div class="input-group">
                        <!-- <input type="text" id="end-time" class="form-control full-line" readonly v-model="endTime"> -->
                        <DatePicker v-model="endTime" :class="'full-line'" :config="pickerOption" :readOnly="true" ></DatePicker>
                        <span class="input-group-addon date-reset" @click="clearTime('endTime')"><i class="glyphicon glyphicon-remove"></i></span>
                      </div>
                    </div>
                    <button type="button" class="btn green-sharp table-group-action-submit" @click="getTableData('ltable')"><i class="fa fa-search"></i> 搜索</button>
                  </form>
                </div>
              </ServerTable>
            </div>
          </tab>
        </tabs>
    </div>
  </div>
</template>

<script>
  import ServerTable from '../components/DataTable/ServerDatasource'
  import DatePicker from '../components/DateTimePicker'
  import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

  export default {
    name: 'dataQuery',
    components:{
      ServerTable,
      DatePicker
    },
    data (){
      return {
        fsource:'',
        lsource:'',
        fcolumns: [{
          name:'#',
          key:'id'
        },{
          name:'站点',
          key:'station'
        },{
          name:'起报时间',
          key:'evalTime'
        },{
          name:'预报时间',
          key:'fcstTime'
        },{
          name:'风速',
          key:'windSpeed'
        },{
          name:'风向',
          key:'windDirection'
        }],
        lcolumns: [{
          name:'#',
          key:'id'
        },{
          name:'站点',
          key:'station'
        },{
          name:'时间',
          key:'time'
        },{
          name:'风速',
          key:'windSpeed'
        },{
          name:'风向',
          key:'windDirection'
        }],
        translation:{
          limit: '显示条数：',
          search: '搜索',
          placeholder_search: '输入关键词搜索..',
          records_not_found: '无匹配记录',
          pagination: {
              show: '显示第',
              to: '至',
              of: '条记录，共',
              entries: '条记录'
          }
        },
        limits:[10,15,20],
        fcstType:1,
        fcstTime:'',
        startTime:'',
        endTime:'',
        pickerOption:{
          ignoreReadonly:true,
          locale:'zh-cn',
          format:'YYYY-MM-DD HH:mm'
        }
      }
    },
    methods:{
      getTableData(table){
        var target = this.$refs[table]
        var params = {}
        switch (table){
          case 'ftable':
          params = {'fcstType':this.fcstType,'fcstTime':this.fcstTime}
          break;
          case 'ltable':
          params = {'startTime':this.startTime,'endTime':this.endTime}
          break;
        }
        target.setParams(params)
        target.setData()
      },
      clearTime(obj){
        this[obj]=null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/*这个样式本来是不需要的，但是vue-strap的datepicker组件没有设置css的scoped，导致样式冲突，只能加上了*/
.table-container .datepicker {
  position: static;
  display: block;
}


</style>
