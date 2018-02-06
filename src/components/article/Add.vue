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
          v-model="textarea">
        </el-input>
        <quill-editor class="editor" v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
      </el-main>
      <el-aside width="420px">
        <!-- 缩略图 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>缩略图</span>
          </div>
          <img width="100%" ref="thumb" src="http://placeholder.qiniudn.com/640x300">
        </el-card>
        <!-- 文章分类 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章分类</span>
          </div>
          <el-select v-model="addData.cat" style="width:100%" placeholder="选择分类">
            <el-option
              v-for="item in cats"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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
            <el-checkbox v-for="group in usergroups" :label="group.value" :key="group.value">{{group.label}}</el-checkbox>
          </el-checkbox-group>
        </el-card>
      </el-aside>
    </el-container>

    <el-dialog title="裁剪图片" :visible.sync="CropperDialog">
      <vueCropper
        style="height: 500px;"
        ref="cropper"
        :img="example3.img"
        :autoCrop="example3.autoCrop"
        :autoCropWidth="example3.autoCropWidth"
        :autoCropHeight="example3.autoCropHeight"
        :fixedBox="example3.fixedBox"
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
      editorOption: {},
      content: 'sasasdfsd',
      cats: [{
        value: 1,
        label: '分类1'
      }],
      ugids: [1, 2],
      usergroups: [{
        value: 1,
        label: '初级会员'
      },
      {
        value: 2,
        label: '高级会员'
      }],
      ugOption: {
        checkAll: false,
        checked: [1],
        isIndeterminate: true
      },
      example3: {
        img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
        autoCrop: true,
        autoCropWidth: 640,
        autoCropHeight: 320,
        fixedBox: true
      },
      CropperDialog: true,
      addData: {} // submit 数据
    }
  },
  methods: {
    preview: function () {
      this.$refs.cropper.getCropData((data) => {
        this.CropperDialog = false
        this.$refs.thumb.src = data
      })
    },
    handleCheckAllChange (val) {
      var checked = val ? this.ugids : []
      this.ugOption.checked = checked
      this.ugOption.isIndeterminate = false
    },
    handleCheckedChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.usergroups.length
      this.ugOption.isIndeterminate = checkedCount > 0 && checkedCount < this.usergroups.length
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
</style>
