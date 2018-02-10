// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './http'
import {
  Button,
  Container,
  Header,
  Main,
  Footer,
  Aside,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Input,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
  Card,
  Dialog,
  Message,
  MessageBox,
  Loading,
  Upload
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 图标
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import Libs from './libs'

Vue.prototype.axios = axios

Vue.component('icon', Icon)

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Aside)
Vue.use(Submenu)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.prototype.errHandle = (err, msg = '') => {
  console.log(err)
  var message = ''
  if (err.status === 400) {
    message = err.data.message
  } else {
    message = '发生未知错误'
  }

  if (msg !== '') {
    message += '，' + msg
  }
  Vue.prototype.$message.error(message)
}

Vue.prototype.Dateformat = function (date, fmt) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

Vue.config.productionTip = false

// 公共库
Vue.prototype.$libs = Libs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
