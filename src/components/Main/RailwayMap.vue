<template>
  <div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title"><i class="fa fa-map-marker"></i> 铁路地图</h3>
    </div>
    <div class="panel-body">
        <div class="alert-container">
            <span class="stations"></span>
            <span class="statue"></span>
            <span class="windpic"></span>
        </div>
        <div id="map" class="map">
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'railwayMap'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>




