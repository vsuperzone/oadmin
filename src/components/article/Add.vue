<template>
  <div class="article-add">
    <el-input
      placeholder="文章标题"
      v-model="addData.title"
      clearable>
    </el-input>
    <el-select v-model="addData.cat" placeholder="选择分类">
      <el-option
        v-for="item in cats"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <el-checkbox :indeterminate="ugOption.isIndeterminate" v-model="ugOption.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="ugOption.checked" @change="handleCheckedChange">
      <el-checkbox v-for="group in usergroups" :label="group.value" :key="group.value">{{group.label}}</el-checkbox>
    </el-checkbox-group>

    <quill-editor v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)">
    </quill-editor>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'article-list',
  components: {
    quillEditor
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
      addData: {} // submit 数据
    }
  },
  methods: {
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
