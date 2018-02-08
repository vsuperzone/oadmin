<template>
  <div class="user">

    <!-- 会员组管理 -->
    <el-button type="primary" :loading="groupShowLoad" @click="group_show">会员组</el-button>
    <el-dialog title="分类管理" :visible.sync="groupDialog">

      <!-- 会员组列表 -->
      <el-table :data="groupData.data" style="width: 100%">

        <el-table-column label="ID" width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <el-table-column label="分组名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="别名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.alias }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 添加会员组 -->
      <el-dialog width="30%" title="新增分类" :visible.sync="groupAddDialog" append-to-body>
        <el-input placeholder="分类名称" v-model="groupAddData.name" clearable></el-input>
        <el-input placeholder="别名（英文）" v-model="groupAddData.alias" clearable></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="groupAddDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="group_add" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="groupDialog = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="groupAddDialog = true" size="small">添加会员组</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      groupDialog: false,
      groupAddDialog: false,
      groupAddData: {},
      groupData: false,
      groupShowLoad: false // 会员组loading
    }
  },
  methods: {
    group_show: function () {
      if (!this.groupData) {
        this.groupShowLoad = true
        this.group_get()
      } else {
        this.groupDialog = true
      }
    },
    group_get: function () {
      this.axios.get('/server/api/member/group')
        .then((res) => {
          this.groupData = res.data
          this.groupShowLoad = false
          this.groupDialog = true
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },
    group_add: function () {
      this.axios.post('/server/api/member/group/add', this.groupAddData)
        .then((res) => {
          this.$message.success('添加成功')
          this.groupAddDialog = false
        })
        .catch((err) => {
          var message = ''
          if (err.status === 400) {
            message = err.data.message
          } else {
            message = '添加失败，未知错误。'
          }
          this.$message.error(message)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
