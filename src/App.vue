<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: 'App',
  components: {
    'o-menu': Menu
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  width: 100%;
  height: 100%;
}
* {
  font-family: mcore_sans_n45_regular,"Avenir Next","Helvetica Neue",Helvetica,Arial,"PingFang SC","Source Han Sans SC","Hiragino Sans GB","Microsoft YaHei","WenQuanYi MicroHei",sans-serif;
}
th {
  font-weight: 500;
  color: #5e6166;
  background-color: #f7f7f7 !important;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
