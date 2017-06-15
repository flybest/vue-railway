<template>
  <div class="page-header navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-1" aria-expanded="false" @click="mobileNavbarToggle">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <div class="navbar-brand" href="#">{{title}}</div>
        </div>
        <Navbar :is-collapsed='isCollapsed'></Navbar>
    </div>
</div>
</template>

<script>
import Navbar from './Navbar'

export default {
  name: 'header',
  components: {
    Navbar
  },
  data () {
    return {
      title: '高速铁路气象防灾预警服务系统',
      isCollapsed: true
    }
  },
  methods: {
    mobileNavbarToggle (e) {
      e.preventDefault()
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
