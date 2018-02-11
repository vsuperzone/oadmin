<template>
  <div class="article-add">
    <el-container>
      <el-main class="main">

        <!-- 标题 -->
        <el-input
          placeholder="文章标题"
          style="margin-bottom: 15px;"
          v-model="editData.title"
          clearable>
        </el-input>

        <!-- 摘要 -->
        <el-input
          type="textarea"
          :rows="2"
          style="margin-bottom: 15px;"
          placeholder="文章概要"
          v-model="editData.description">
        </el-input>

        <!-- 图片上传 -->
        <el-card class="box-card">
          <div class="images">
            <ul>
              <li v-for="(v,i) in images" :key="i" @click="image_insert(v)"><img :src="v"></li>
              <el-upload
                action="/server/api/admin/uploader"
                list-type="picture-card"
                style="width: 148px;"
                :headers="uploadHeader"
                accept="image/png, image/jpeg, image/gif, image/jpg"
                :on-success="upload_success"
                :show-file-list="false"
                multiple>
                <i class="el-icon-upload"></i>
              </el-upload>
            </ul>
          </div>
        </el-card>

        <!-- 正文 -->
        <quill-editor class="editor" placeholder="文章标题" v-model="editData.content"
          ref="editor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
      </el-main>
      <el-aside width="380px" style="padding: 20px 20px 20px 0">

        <!-- 发布文章 -->
        <el-card class="box-card">
          <el-button type="primary" @click="release" width="200" style="width: 100%;">提交修改</el-button>
        </el-card>

        <!-- 缩略图 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>缩略图</span>
            <el-button type="primary" @click="CropperDialog = true" size="mini" style="float: right;">裁剪</el-button>
          </div>
          <div class="thumb" @click="thumb_btn">
            <img v-if="editData.thumb" width="100%" ref="thumb" :src="editData.thumb">
            <img v-else src="@/assets/640x300.jpg" ref="thumb" width="100%">
          </div>
          <input type="file" style="display:none;" ref="thumbFile" accept="image/png, image/jpeg, image/gif, image/jpg" @change="thumb_add">
        </el-card>

        <!-- 文章分类 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章分类</span>
          </div>
          <el-select v-model="editData.category_id" style="width:100%" placeholder="选择分类">
            <el-option
              v-for="item in data.category"
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
          <el-checkbox-group v-model="editData.permission" @change="handleCheckedChange">
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
        <el-button @click="CropperDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="thumb_upload" size="small">确 定</el-button>
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
import md5 from 'spark-md5'

export default {
  name: 'article-list',
  components: {
    quillEditor,
    VueCropper
  },
  data () {
    return {
      id: this.$route.params.id,
      data: {
        category: []
      },
      editorOption: {
        placeholder: ''
      },

      // 文件上传
      uploadHeader: {
        Authorization: `Bearer ${this.accessToken}`
      },
      uploadToken: {
        key: 'vsuper.jpg'
      },
      images: [],

      // 用户组
      ugids: [],
      ugOption: { // 阅读权限
        checked: [],
        checkAll: false,
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
      editData: {} // submit 数据
    }
  },
  computed: {
  },
  created: function () {
    this.axios.get('/server/api/admin/article/edit/' + this.id)
      .then((res) => {
        this.data = res.data.data
        this.editData = res.data.data.article
        this.group_ids_get(res.data.data.group)
      })
      .catch((err) => {
        this.errHandle(err, '获取数据失败')
      })
  },
  methods: {
    image_insert: function (src) {
      var sel = this.$refs.editor.quill.getSelection()
      var index = sel !== null ? sel.index : 0
      this.$refs.editor.quill.insertEmbed(index, 'image', src)
    },
    upload_success: function (resp, file, fileList) {
      this.images.push(resp.data)
    },
    // 获取上传token
    uploadHandle: function (req) {
      var file = req.file
      var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      var dir = this.Dateformat(new Date(), 'yyyy-MM') // 生成文件目录 格式："年-月"

      // 计算文件md5
      var reader = new FileReader()
      var spark = new md5.ArrayBuffer()

      var currentChunk = 0
      var chunkSize = 2097152 // 分段计算 每段1M
      var chunks = Math.ceil(file.size / chunkSize)

      var loadNext = function () {
        var start = currentChunk * chunkSize
        var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

        reader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }

      reader.onloadend = (e) => {
        spark.append(e.target.result) // Append array buffer
        currentChunk++

        if (currentChunk < chunks) {
          loadNext()
        } else {
          var md5Val = spark.end()
          var fileName = dir + '/' + md5Val // 获得文件路径及名称
          fileName = file.name.replace(/.+?(\.[a-z]+$)/g, fileName + '$1') // 后缀
          this.upload(file, fileName)
        }
      }

      console.log(req)
      var start = currentChunk * chunkSize
      var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
      reader.readAsArrayBuffer(blobSlice.call(file, start, end))
    },

    upload: function (file, name) {
      // 获取token
      this.axios.post('/server/api/admin/qiniu/upload_token', { name: name })
        .then((res) => {
          var token = res.data.data // 上传token
          this.upload_submit(file, token, name)
        })
        .then((err) => {
          this.errHandle(err)
        })
    },
    upload_submit: function (file, token, key) {
      let data = new FormData()
      data.append('file', file)
      data.append('token', token)
      data.append('key', key)

      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }

      this.axios.post('https://upload.qiniup.com', data, config)
        .then((res) => {
          console.log(res)
        })
    },

    // 发布
    release: function () {
      this.axios.post('/server/api/admin/article/edit/' + this.id, this.editData)
        .then((res) => {
          this.$message.success('修改成功')
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },
    // 获取会员组id列表
    group_ids_get: function (group) {
      var ids = []
      for (var v of group) {
        ids.push(v.id)
      }
      this.ugids = ids
    },

    // 缩略图
    thumb_btn: function () {
      this.$refs.thumbFile.click()
    },
    thumb_add: function (e) {
      var file = e.target.files[0]
      // var img = new Image()
      var url = window.URL.createObjectURL(file) // 得到bolb对象路径，可当成普通的文件路径一样使用，赋值给src;
      this.CropopOption.img = url
      this.CropperDialog = true
    },
    thumb_upload: function () { // 上传缩略图
      this.$refs.cropper.getCropData((data) => {
        var blob = this.$libs.dataURLtoBlob(data)

        let postData = new FormData()
        postData.append('file', blob)

        this.axios.post('/server/api/admin/uploader', postData)
          .then((res) => {
            this.CropperDialog = false
            this.editData.thumb = res.data.data
          })
          .catch((err) => {
            this.errHandle(err)
          })
      })
    },
    preview: function () {
      this.$refs.cropper.getCropData((data) => {
        var blob = this.$libs.dataURLtoBlob(data)
        var src = window.URL.createObjectURL(blob)
        console.log(src)
        this.CropperDialog = false
        this.$refs.thumb.src = src
      })
    },
    handleCheckAllChange (val) {
      var checked = val ? this.ugids : []
      this.editData.permission = this.editData.permission = checked
      this.ugOption.isIndeterminate = false
    },
    handleCheckedChange (value) {
      var checkedCount = value.length
      this.ugOption.checkAll = checkedCount === this.data.group.length
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

.images {
  ul {
    display: flex;

  }

  ul li {
    width: 148px;
    height: 148px;
    padding: 8px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    margin-right: 10px;
    border-radius: 6px;
    cursor: pointer;
    background-color: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
