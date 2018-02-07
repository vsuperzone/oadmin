<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="201px">
        <o-menu></o-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view name="main"></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: 'Menu',
  components: {
    'o-menu': Menu
  }
}
</script>

<style>
.el-header {
  background-color: rgb(64, 158, 255);
  line-height: 60px;
}
</style>
