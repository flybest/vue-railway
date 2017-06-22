<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title"><i class="fa fa-database"></i> 数据管理</h3>
    </div>
      <div class="panel-body">
        <tabs>
          <tab header="站点预报">
            <div class="table-container">
              <div class="table-actions-wrapper">
                <span> </span>
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
                    <label for="forcast-time">起报时间</label>
                    <div class="input-group">
                      <input type="text" id="forcast-time" class="form-control" readonly>
                      <span class="input-group-addon date-reset"><i class="glyphicon glyphicon-remove"></i></span>
                    </div>
                  </div>
                  <button type="button" class="btn green-sharp table-group-action-submit"><i class="fa fa-search"></i> 搜索</button>
                </form>
              </div>
              <table class="table table-striped table-bordered table-hover order-column" id="forcast_table">
                <thead>
                <tr>
                  <th> # </th>
                  <th> 站点 </th>
                  <th> 起报时间 </th>
                  <th> 预报时间 </th>
                  <th> 风速 </th>
                  <th> 风向 </th>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </tab>
          <tab header="站点实况">
            <div class="table-container">
              <div class="table-actions-wrapper">
                <span> </span>
                <form class="form-inline">
                  <div class="form-group">
                    <label for="start-time">开始时间</label>
                    <div class="input-group">
                      <input type="text" id="start-time" class="form-control" readonly>
                      <span class="input-group-addon date-reset"><i class="glyphicon glyphicon-remove"></i></span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="end-time">结束时间</label>
                    <div class="input-group">
                      <input type="text" id="end-time" class="form-control" readonly>
                      <span class="input-group-addon date-reset"><i class="glyphicon glyphicon-remove"></i></span>
                    </div>
                  </div>
                  <button type="button" class="btn green-sharp table-group-action-submit"><i class="fa fa-search"></i> 搜索</button>
                </form>
              </div>
              <table class="table table-striped table-bordered table-hover order-column" id="live_table">
                <thead>
                <tr>
                  <th> # </th>
                  <th> 站点 </th>
                  <th> 时间 </th>
                  <th> 风速 </th>
                  <th> 风向 </th>
                </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </tab>
        </tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dataQuery'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
