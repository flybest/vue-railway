<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title"><i class="fa fa-crosshairs"></i> 系统监控</h3>
    </div>
    <div class="panel-body">
      <div class="table-container">
        <ServerTable source="http://localhost/tielu-prototype/server/table_ajax_task_2.php" :columns="columns" :translation="translation" :limits="limits" :show-filter="false">
          <div slot="filterAction" class="table-actions-wrapper">
              <form class="form-inline">
                <div class="form-group">
                  <div class="btn-group" data-toggle="buttons">
                    <label class="btn blue active">
                      <input type="radio" name="task-type" id="task-type-all" autocomplete="off" value="1" checked> 全部日志
                    </label>
                    <label class="btn blue">
                      <input type="radio" name="task-type" id="task-type-failed" autocomplete="off" value="2"> 失败日志
                    </label>
                  </div>
                </div>
                <div class="form-group">
                    <label for="task-name">任务名称</label>
                    <input type="text" id="task-name" class="form-control">
                </div>
                <button type="button" class="btn green-sharp table-group-action-submit"><i class="fa fa-search"></i> 搜索</button>
              </form>
          </div>
        </ServerTable>
      </div>
    </div>
    </div>
</template>

<script>
  import ServerTable from '../components/DataTable/ServerDatasource'

  export default {
    name: 'monitor',
    components:{
      ServerTable
    },
    data (){
      return {
        columns: [{
          name:'任务名称',
          key:'taskName'
        },{
          name:'执行参数',
          key:'params'
        },{
          name:'任务开始时间',
          key:'startTime'
        },{
          name:'任务结束时间',
          key:'endTime'
        },{
          name:'执行状态',
          key:'statue'
        },{
          name:'执行日志',
          key:'log'
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
