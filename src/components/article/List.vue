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
              <el-button type="primary" size="mini">修改</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-dialog width="30%" title="新增分类" :visible.sync="dialogAddCateShow" append-to-body>
          <el-input placeholder="分类名称" v-model="addCate.name" clearable></el-input>
          <el-input placeholder="别名（英文）" v-model="addCate.alias" clearable></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddCateShow = false" size="small">取 消</el-button>
            <el-button type="primary" @click="cate_add" size="small">确 定</el-button>
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
      addCate: {},
      tableData: [],
      cateShowLoad: false // 分类loading
    }
  },
  methods: {
    cate_show: function () {
      if (this.cateData) {
        this.dialogCateShow = true
        return
      }
      this.cateShowLoad = true
      this.axios.get('/server/api/category')
        .then((res) => {
          this.cateShowLoad = false
          this.dialogCateShow = true
          this.cateData = res.data.data
        })
    },
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

<style lang="scss" scoped>
.header-handle {
  margin-bottom: 20px;

  .item {
    margin-right: 10px;
  }
}

.header-row-class-name {
  background-color: rgb(247, 247, 247);
}
</style>
