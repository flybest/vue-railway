<template>
  <div>
    <AppHeader></AppHeader>
    <div class="page-container" style="min-height:500px;">
      <!--[if lte IE 8]>
      <p class="bad-browser bg-red bg-font-red">您正在使用一款 <strong>过时</strong> 的浏览器. 某些功能可能无法使用. 请 <a href="http://browsehappy.com/">升级您的浏览器</a> 来改善使用体验.</p>
      <![endif]-->
      <router-view></router-view>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import AppFooter from '../components/Footer'

export default {
  name: 'full',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
