<template>
  <div :class="{ 'collapse' : isCollapsed, 'collapsed' : !isCollapsed }" class="navbar-collapse" id="navbar-1">
    <ul class="nav navbar-nav" id="mainmenu">
      <router-link tag='li' :to="'/home'" exact><a href=""><i class="fa fa-home"></i> 首页</a></router-link>
      <router-link tag='li' :to="'/data-query'" exact><a href=""><i class="fa fa-search"></i> 数据查询</a></router-link>
      <router-link tag='li' :to="'/monitor'" exact><a href=""><i class="fa fa-tv"></i> 系统监控</a></router-link>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <Dropdown>
        <!-- <span slot="button"> -->
        <i slot="button" class="fa fa-bell-o"></i>
        <span slot="button" class="badge badge-danger">2</span>
        <!-- </span> -->
        <ul slot="dropdown-menu" class="dropdown-menu">
            <li>
              <div class="detail">
                <span class="label label-danger label-icon">
                  <i class="fa fa-exclamation-triangle"></i>
                </span>
                2个站点未来24小时出现停车预警
              </div>
            </li>
            <li>
              <div class="detail">
                <span class="label label-warning label-icon">
                  <i class="fa fa-exclamation-triangle"></i>
                </span>
                1个站点未来24小时出现减速预警
              </div>
            </li>
            <li>
              <div class="detail">
                <span class="label label-primary label-icon">
                    <i class="fa fa-exclamation-triangle"></i>
                </span>
                模式预报数据入库错误
              </div>
            </li>
        </ul>
      </Dropdown>
    </ul>
  </div>
</template>

<script>
import Dropdown from 'vue-strap/src/dropdown'

export default {
  name: 'navbar',
  components: {
    Dropdown
  },
  props: {
    isCollapsed:{
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      // isOpened: false
    }
  },
  methods: {
    // navbarDropdownToggle (e) {
    //   e.preventDefault()
    //   this.isOpened = !this.isOpened
    // }
  },
  created () {
    this._navbar = true
  }
}
</script>
