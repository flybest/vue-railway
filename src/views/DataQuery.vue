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
                        <label class="btn blue active">
                          <input type="radio" name="forcast-type" id="option1" autocomplete="off" value="1" checked> 模式预报
                        </label>
                        <label class="btn blue">
                          <input type="radio" name="forcast-type" id="option2" autocomplete="off" value="2"> 阵风预报
                        </label>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="forcast-time">起报时间：</label>
                      <div class="input-group">
                        <input type="text" id="forcast-time" class="form-control full-line" readonly>
                        <span class="input-group-addon date-reset"><i class="glyphicon glyphicon-remove"></i></span>
                      </div>
                    </div>
                    <button type="button" class="btn green-sharp table-group-action-submit"><i class="fa fa-search"></i> 搜索</button>
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
                        <input type="text" id="start-time" class="form-control full-line" readonly>
                        <span class="input-group-addon date-reset"><i class="glyphicon glyphicon-remove"></i></span>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="end-time">结束时间：</label>
                      <div class="input-group">
                        <input type="text" id="end-time" class="form-control full-line" readonly>
                        <span class="input-group-addon date-reset"><i class="glyphicon glyphicon-remove"></i></span>
                      </div>
                    </div>
                    <button type="button" class="btn green-sharp table-group-action-submit"><i class="fa fa-search"></i> 搜索</button>
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

  export default {
    name: 'dataQuery',
    components:{
      ServerTable
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
        limits:[10,15,20]
      }
    },
    methods:{
      getTableData(){
        this.$refs.table.setParams({'taskType':this.taskType,'taskName':this.taskName})
        this.$refs.table.setData()
      }
    },
    watch:{
      taskType(){
        this.getTableData()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
