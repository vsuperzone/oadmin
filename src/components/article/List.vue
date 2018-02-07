<template>
  <div class="article-list">
    <!-- 分类 -->
    <el-button type="primary" @click="dialogCateShow = true">分类管理</el-button>
    <el-dialog title="分类管理" :visible.sync="dialogCateShow">
      <el-button type="primary" @click="dialogAddCateShow = true">新增分类</el-button>
      <el-dialog
        width="30%"
        title="新增分类"
        :visible.sync="dialogAddCateShow"
        append-to-body>
        <el-input
          placeholder="分类名称"
          v-model="addCate.name"
          clearable>
        </el-input>
        <el-input
          placeholder="别名（英文）"
          v-model="addCate.alias"
          clearable>
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddCateShow = false">取 消</el-button>
          <el-button type="primary" @click="cate_add">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="日期"
        width="180">
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
  name: 'article-list',
  data () {
    return {
      dialogCateShow: false,
      dialogAddCateShow: false,
      addCate: {},
      tableData: []
    }
  },
  methods: {
    cate_add: function () {
      this.axios.post('/server/api/category/add', this.addCate)
        .then(res => {
          this.$message.success('添加成功')
        })
        .catch(e => {
          console.log(e)
          this.$message.error('添加失败')
        })
      // this.dialogAddCateShow = false
    }
  }
}
</script>
