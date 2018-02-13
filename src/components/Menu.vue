<template>
  <el-menu default-active="2" class="nav" :router="true" @open="handleOpen" @close="handleClose">
    <router-link :to="{name: 'home'}" class="logo"></router-link>
    <el-menu-item index="1" :route="{name: 'article-list'}">
      <i class="el-icon-menu"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="2" :route="{name: 'user'}">
      <i class="el-icon-setting"></i>
      <span slot="title">会员管理</span>
    </el-menu-item>
    <el-menu-item index="3" :route="{name: 'user-examine'}">
      <i class="el-icon-setting"></i>
      <span slot="title">会员审核</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen: function (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose: function (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  height: 90px;
  background: url(../assets/long.png) center center no-repeat;
  background-size: 50px;
  border-bottom: 1px solid #e6e6e6;
}
.nav {
  background-color: #f5f7fa;
  height: 100%;
}
.is-active {

}
.el-menu-item {
  color: #71747b;

  i {
    margin-right: 20px;
  }
}
.el-menu-item.is-active {
  background: #e1edfa;
  color: #464646;
  border-left: 3px solid #008afe;
  padding-left: 17px !important;
}

.el-menu-item:focus, .el-menu-item:hover {
  background: #e1edfa;
}

.el-menu-item, .el-submenu__title {
  height: 45px;
  line-height: 45px;
  margin-bottom: 5px;
}
</style>
