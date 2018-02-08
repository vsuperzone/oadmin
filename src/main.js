// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
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
  Loading
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 图标
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

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

import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
