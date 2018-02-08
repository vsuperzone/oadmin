<template>
  <div class="admin" :v-show="Floading">
    <el-container style="height: 100%">
      <el-container>
        <el-aside width="230px">
          <o-menu></o-menu>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>
            <router-view name="main"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
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

<style lang="scss" scoped>
.el-header {
  /*background-color: rgb(64, 158, 255);*/
  border-bottom: 1px solid #e6e9f0;
  line-height: 60px;
}

.admin {
  height: 100%;
}

.admin /deep/ .header-handle {
  margin-bottom: 20px;
  display: flex;

  .item {
    margin-right: 10px;
  }
}
</style>
