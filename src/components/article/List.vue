<template>
  <div class="article-list">
    <div class="header-handle">
      <router-link :to="{name: 'article-add'}" class="item">
        <el-button type="primary" @click="cate_show" size="small">添加文章</el-button>
      </router-link>

      <!-- 分类 -->
      <el-button class="item" @click="cate_show" :loading="cateShowLoad" size="small" plain>分类管理</el-button>
      <el-dialog title="分类管理" :visible.sync="dialogCateShow">

        <!-- 分类列表 -->
        <el-table :data="cateData.data" style="width: 100%">
          <el-table-column label="ID" width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="分类名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="别名">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.alias }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <el-button type="primary" @click="cate_edit_btn(scope.row)" size="mini">修改</el-button>
              <el-button type="danger" @click="cate_del_confirm(scope.row)" size="mini">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!-- 添加分类 -->
        <el-dialog width="30%" title="新增分类" :visible.sync="dialogAddCateShow" append-to-body>
          <el-input placeholder="分类名称" style="margin-bottom: 15px;" v-model="cateAddData.name" clearable></el-input>
          <el-input placeholder="别名（英文）" v-model="cateAddData.alias" clearable></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddCateShow = false" size="small">取 消</el-button>
            <el-button type="primary" @click="cate_add" size="small">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 修改分类 -->
        <el-dialog width="30%" title="修改分类" :visible.sync="dialogEditCateShow" append-to-body>
          <el-input placeholder="分类名称" style="margin-bottom: 15px;" v-model="cateEditData.name" clearable></el-input>
          <el-input placeholder="别名（英文）" v-model="cateEditData.alias" clearable></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogEditCateShow = false" size="small">取 消</el-button>
            <el-button type="primary" @click="cate_edit" size="small">确 定</el-button>
          </span>
        </el-dialog>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogAddCateShow = true" size="small">新增分类</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 文章列表 -->
    <el-table :data="tableData" class="list" style="width: 100%">
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
  name: 'article-list',
  data () {
    return {
      dialogCateShow: false,
      dialogAddCateShow: false,
      cateData: false,
      cateAddData: {},
      tableData: [],

      // 修改分类
      dialogEditCateShow: false,
      cateEditData: {},

      cateShowLoad: false // 分类loading
    }
  },
  created: function () {
    this.axios.get('/server/api/admin/article')
      .then((res) => {
        this.Floading.close()
      })
  },
  methods: {
    cate_show: function () {
      if (this.cateData) {
        this.dialogCateShow = true
        return
      }
      this.cateShowLoad = true
      this.cate_get()
    },
    cate_get: function () { // 获取分类
      this.axios.get('/server/api/admin/category')
        .then((res) => {
          this.cateShowLoad = false
          this.dialogCateShow = true
          this.cateData = res.data.data
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },

    // 删除分类
    cate_del_confirm: function (d) { // 删除提示
      this.$confirm('此操作将永久删除'+ d.name +', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cate_del(d.id)
      })
    },
    cate_del: function (id) {
      this.axios.get('/server/api/admin/category/delete/' + id)
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.cate_get() // 重新加载分类
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },

    // 修改分类
    cate_edit_btn: function (d) {
      this.cateEditData = d
      this.dialogEditCateShow = true
    },
    cate_edit: function () {
      this.axios.post('/server/api/admin/category/edit', this.cateEditData)
        .then(res => {
          this.dialogEditCateShow = false
          this.$message.success('修改成功')
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },

    // 添加分类
    cate_add: function () {
      this.axios.post('/server/api/admin/category/add', this.cateAddData)
        .then(res => {
          this.dialogAddCateShow = false
          this.$message.success('添加成功')
          this.cate_get() // 重新获取分类
        })
        .catch((err) => {
          this.errHandle(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-row-class-name {
  background-color: rgb(247, 247, 247);
}
</style>
