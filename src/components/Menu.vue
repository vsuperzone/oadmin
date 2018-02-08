<template>
  <el-menu
    default-active="2"
    class="nav"
    :router="true"
    @open="handleOpen"
    @close="handleClose">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2" :route="{name: 'article-list'}">
      <i class="el-icon-menu"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="3" :route="{name: 'user'}">
      <i class="el-icon-setting"></i>
      <span slot="title">会员管理</span>
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
    color: #1983f1;
    border-left: 3px solid #008afe;
  }

  .el-menu-item, .el-submenu__title {
    height: 45px;
    line-height: 45px;
    margin-bottom: 5px;
  }
</style>
