<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title"><i class="fa fa-crosshairs"></i> 系统监控</h3>
    </div>
    <div class="panel-body">
      <div class="table-container">
          <div class="table-actions-wrapper">
              <span> </span>
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
          <!-- <table class="table table-striped table-bordered table-hover order-column" id="task_table">
            <thead>
            <tr>
              <th> 任务名称 </th>
              <th> 任务参数 </th>
              <th> 任务开始时间 </th>
              <th> 任务结束时间 </th>
              <th> 执行状态 </th>
              <th> 执行日志 </th>
            </tr>
            </thead>
            <tbody>

            </tbody>
          </table> -->
          <!-- <ServerTable url="/people" :columns="columns" :options="options"></ServerTable> -->
          <ServerTable url="http://localhost/tielu-prototype/server/table_ajax_task_1.php" :columns="columns" :options="options">
            <template slot="template" scope="props">
              <div class="VueTables VueTables--server">

              </div>
            </template>
          </ServerTable>
      </div>
    </div>
    </div>
</template>

<script>
  import {ClientTable, ServerTable, Event} from 'vue-tables-2'

  export default {
    name: 'monitor',
    components:{
      ClientTable,
      ServerTable
    },
    data (){
      return {
        columns: ['任务名称','任务参数','任务开始时间','任务结束时间','执行状态','执行日志'],
        options: {
          sortable:[],
          filterable:false,
          pagination:{chunk:5},
          templates:{}
        }
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
