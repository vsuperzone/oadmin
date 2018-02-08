<template>
  <div class="article-add">
    <el-container>
      <el-main class="main">
        <el-input
          placeholder="文章标题"
          style="margin-bottom: 15px;"
          v-model="addData.title"
          clearable>
        </el-input>
        <el-input
          type="textarea"
          :rows="2"
          style="margin-bottom: 15px;"
          placeholder="文章概要"
          v-model="addData.description">
        </el-input>
        <quill-editor class="editor" v-model="addData.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
      </el-main>
      <el-aside width="380px">

        <!-- 发布文章 -->
        <el-card class="box-card">
          <el-button type="primary" @click="release" style="width: 100%;">发布文章</el-button>
        </el-card>

        <!-- 缩略图 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>缩略图</span>
            <el-button type="primary" @click="CropperDialog = true" size="mini" style="float: right;">裁剪</el-button>
          </div>
          <div class="thumb" @click="thumb_btn">
            <img width="100%" ref="thumb" src="addData.thumb">
          </div>
          <input type="file" style="display:none;" ref="thumbFile" accept="image/png, image/jpeg, image/gif, image/jpg" @change="thumb_add">
        </el-card>

        <!-- 文章分类 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章分类</span>
          </div>
          <el-select v-model="addData.cat" style="width:100%" placeholder="选择分类">
            <el-option
              v-for="item in data.category.data"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-card>

        <!-- 阅读权限 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>阅读权限</span>
            <el-checkbox style="float: right;" :indeterminate="ugOption.isIndeterminate" v-model="ugOption.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          </div>
          <el-checkbox-group v-model="ugOption.checked" @change="handleCheckedChange">
            <el-checkbox v-for="group in data.group" :label="group.id" :key="group.id">{{group.name}}</el-checkbox>
          </el-checkbox-group>
        </el-card>
      </el-aside>
    </el-container>

    <!-- 裁剪缩略图 -->
    <el-dialog title="裁剪缩略图" width="900px" :visible.sync="CropperDialog">
      <vueCropper
        style="height: 400px"
        ref="cropper"
        :img="CropopOption.img"
        :autoCrop="CropopOption.autoCrop"
        :autoCropWidth="CropopOption.autoCropWidth"
        :autoCropHeight="CropopOption.autoCropHeight"
        :fixedBox="CropopOption.fixedBox"
      ></vueCropper>
      <div slot="footer" class="dialog-footer">
        <el-button @click="CropperDialog = false">取 消</el-button>
        <el-button type="primary" @click="preview">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import VueCropper from 'vue-cropper'

export default {
  name: 'article-list',
  components: {
    quillEditor,
    VueCropper
  },
  data () {
    return {
      data: {
        category: []
      },
      editorOption: {},

      // 用户组
      ugids: [],
      ugOption: { // 阅读权限
        checkAll: false,
        checked: [1],
        isIndeterminate: true
      },

      // 裁剪
      CropopOption: {
        img: '',
        autoCrop: true,
        autoCropWidth: 640,
        autoCropHeight: 300,
        fixedBox: true
      },
      CropperDialog: false,

      thumbOriginal: false, // 缩略图原图
      addData: {} // submit 数据
    }
  },
  computed: {
  },
  created: function () {
    this.axios.get('/server/api/admin/article/add')
      .then((res) => {
        this.data = res.data.data
        this.group_ids_get(res.data.data.group)
        this.Floading.close()
      })
      .catch((err) => {
        this.errHandle(err, '获取数据失败')
      })
  },
  methods: {
    // 发布
    release: function () {
      console.log(this.addData)
    },
    // 获取会员组id列表
    group_ids_get: function (group) {
      var ids = []
      for (var v of group) {
        ids.push(v.id)
      }
      this.ugids = ids
    },
    thumb_btn: function () {
      this.$refs.thumbFile.click()
    },
    thumb_add: function (e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.onload = (e) => {
        this.CropopOption.img = e.target.result
      }
      reader.readAsDataURL(file)
      this.CropperDialog = true
    },
    preview: function () {
      this.$refs.cropper.getCropData((data) => {
        this.CropperDialog = false
        this.$refs.thumb.src = data
      })
    },
    handleCheckAllChange (val) {
      var checked = val ? this.ugids : []
      this.ugOption.checked = this.addData.permission = checked
      this.ugOption.isIndeterminate = false
    },
    handleCheckedChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.data.group.length
      this.ugOption.isIndeterminate = checkedCount > 0 && checkedCount < this.data.group.length
    },
    onEditorBlur: function () {

    },
    onEditorFocus: function () {

    },
    onEditorReady: function () {

    }
  }
}
</script>

<style>
.ql-editor {
  min-height: 300px;
}
</style>
<style lang="scss" scoped>
.editor {
  background-color: #fff;
}
.article-add {
  .main {
    // padding: 0;
  }
}
.box-card {
  margin-bottom: 15px;
}

.thumb {
  cursor: pointer;
}
</style>
