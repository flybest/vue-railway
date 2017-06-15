// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import nprogress from './progress'
import store from './store'
import _ from 'lodash'
import Tween from '@tweenjs/tween.js'
import * as links from 'assets/js/url'

//import jQuery from 'jquery'

//window.jQuery = jQuery   // 经过测试发现，需要将jquery注册到window中，变成全局对象，使用时调用window.jQuery
window._=_
window.links=links
window.TWEEN=Tween

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  nprogress,
  store,
  template: '<App/>',
  components: { App }
})

// main.js为主入口方法，router.js为路由配置，progress.js为进度配置, store.js为vuex
// container为容器
// components为组件
// views为页面整体视图，目前包括三个页面
