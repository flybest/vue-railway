import Vue from 'vue'
import Router from 'vue-router'
import Full from './containers/Full'
import Main from './views/Main'
import DataQuery from './views/DataQuery'
import Monitor from './views/Monitor'

Vue.use(Router)

export default new Router({
  // mode: 'hash',   //根据具体情况修改
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Full',
      component: Full,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Main
        },
        {
          path: 'data-query',
          name: 'DataQuery',
          component: DataQuery
        },
        {
          path: 'monitor',
          name: 'Monitor',
          component: Monitor
        }
      ]
    }
  ]
})
