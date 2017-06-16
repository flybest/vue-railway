// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import nprogress from './progress'
import store from './store'
import _ from 'lodash'
import * as links from 'assets/js/url'
import Strap from 'vue-strap'
// import Alert from 'vue-strap/src/Alert'
// import Dropdown from 'vue-strap/src/Dropdown'
import Spinner from 'vue-simple-spinner'
//import jQuery from 'jquery'
import './assets/styles/app.scss';

//window.jQuery = jQuery   // 经过测试发现，需要将jquery注册到window中，变成全局对象，使用时调用window.jQuery
window._=_
window.links=links

Vue.component("Dropdown", Strap.dropdown)
Vue.component("Alert", Strap.alert)
// Vue.component("Dropdown", Dropdown)
// Vue.component("Alert", Alert)
// 这里有一个问题，分别加载肯定体积小，但是打包过程中并没有把es6转成es5，导致压缩失败
// 加载一个总包，因为是转换之后的，因此压缩成功，但总体包的体积就会很大

Vue.component("Spinner", Spinner)

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
