<template>
  <div class="user">

    <div class="header-handle">
      <!-- 会员组管理 -->
      <el-button type="primary" class="item" @click="groupDialog = true" size="small">会员组</el-button>

      <!-- 筛选会员组 -->
      <el-select v-model="groupSelect" class="item" style="width: 120px;" size="small" clearable placeholder="筛选会员组">
        <el-option
          v-for="item in data.group"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>

    <el-dialog title="会员组管理" :visible.sync="groupDialog">

      <!-- 会员组列表 -->
      <el-table :data="data.group" style="width: 100%">

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

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="group_edit_btn(scope.row)" size="mini">修改</el-button>
            <el-button type="danger" @click="group_del_confirm(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 添加会员组 -->
      <el-dialog width="30%" title="新增分类" :visible.sync="groupAddDialog" append-to-body>
        <el-input placeholder="分类名称" style="margin-bottom: 15px;" v-model="groupAddData.name" clearable></el-input>
        <el-input placeholder="别名（英文）" v-model="groupAddData.alias" clearable></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="groupAddDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="group_add" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改会员组 -->
      <el-dialog width="30%" title="新增分类" :visible.sync="groupEditDialog" append-to-body>
        <el-input placeholder="分类名称" style="margin-bottom: 15px;" v-model="groupEditData.name" clearable></el-input>
        <el-input placeholder="别名（英文）" v-model="groupEditData.alias" clearable></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="groupEditDialog = false" size="small">取 消</el-button>
          <el-button type="primary" @click="group_edit" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="groupDialog = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="groupAddDialog = true" size="small">添加会员组</el-button>
      </span>
    </el-dialog>

    <!-- 会员列表 -->
    <el-table :data="data.user" class="list" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      data: {}, // 会员列表

      // 修改会员组
      groupEditDialog: false,
      groupEditData: {},

      groupSelect: '' // 删选会员组
    }
  },
  created: function () {
    this.axios.get('/server/api/admin/member')
      .then((res) => {
        this.data = res.data.data
      })
      .catch((err) => {
        this.errHandle(err, '获取数据失败')
      })
  },
  methods: {
    group_get: function () { // 获取会员组
      this.axios.get('/server/api/admin/member/group')
        .then((res) => {
          this.data.group = res.data.data
          this.groupDialog = true
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },

    // 修改会员组
    group_edit_btn: function (d) {
      this.groupEditData = d
      this.groupEditDialog = true
    },
    group_edit: function () {
      this.axios.post('/server/api/admin/member/group/edit', this.groupEditData)
        .then((res) => {
          this.$message.success('修改成功')
          this.groupEditDialog = false
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },

    // 添加会员组
    group_add: function () {
      this.axios.post('/server/api/admin/member/group/add', this.groupAddData)
        .then((res) => {
          this.$message.success('添加成功')
          this.groupAddDialog = false
          this.group_get() // 重新获取会员组
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },

    // 删除会员组
    group_del_confirm: function (d) { // 删除提示
      this.$confirm('此操作将永久删除' + d.name + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.group_del(d.id)
      })
    },
    group_del: function (id) {
      this.axios.get('/server/api/admin/member/group/delete/' + id)
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.group_get() // 重新获取
        })
        .catch((err) => {
          this.errHandle(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
