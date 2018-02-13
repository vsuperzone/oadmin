<template>
  <div class="user">

    <div class="header-handle">
      <!-- 会员组管理 -->
      <el-button type="primary" class="item" @click="groupDialog = true" size="small">会员组</el-button>

      <!-- 地区筛选 -->
      <el-select v-model="adressFilter.province" @change="province_select" class="item" placeholder="请选择" size="small">
        <el-option
          v-for="item in addressData.province"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-if="city" v-model="adressFilter.city" class="item" @change="city_select" placeholder="请选择" size="small" clearable>
        <el-option
          v-for="item in city"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-if="region" v-model="adressFilter.region" class="item" @change="region_select" placeholder="请选择" size="small" clearable>
        <el-option
          v-for="item in region"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" class="item" @click="member_get" size="small">确认</el-button>
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
    <el-table :data="data.member.data" class="list" style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="姓名" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="70">
        <template slot-scope="scope">
          <span>{{ sex[scope.row.sex] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.certnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地区">
        <template slot-scope="scope">
          <span>{{ region_change(scope.row.region) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="具体地址">
        <template slot-scope="scope">
          <span>{{ scope.row.adress }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="examine([scope.row.id], true)" size="mini">通过</el-button>
          <el-button type="danger" @click="examine([scope.row.id], false)" size="mini">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ChinaAddressV4Data from '@/datas/china_address_v4.json'

export default {
  name: 'Examine',
  data () {
    return {
      groupDialog: false,
      groupAddDialog: false,
      groupAddData: {},
      data: {
        member: {}
      }, // 会员列表

      sex: ['女', '男'],
      adressFilter: {
        province: null,
        city: null,
        region: null
      },
      addressData: [],

      // 修改会员组
      groupEditDialog: false,
      groupEditData: {},

      groupSelect: '' // 删选会员组
    }
  },
  computed: {
    city: function () {
      var province = this.adressFilter.province
      return this.addressData.region[province]
    },
    region: function () {
      var city = this.adressFilter.city
      return this.addressData.region[city]
    }
  },
  created: function () {
    this.region_init() // 初始化地区数据

    // 获取用户地区筛选数据
    this.adressFilter.province = window.localStorage.province
    this.adressFilter.city = window.localStorage.city
    this.adressFilter.region = window.localStorage.region

    var params = {}
    params.status = 2
    if (this.adressFilter.region) {
      params.region = this.adressFilter.region
    } else if (this.adressFilter.city) {
      params.city = this.adressFilter.city
    } else if (this.adressFilter.province) {
      params.province = this.adressFilter.province
    }

    this.params = params

    this.axios.get('/server/api/admin/member', { params: params })
      .then((res) => {
        this.data = res.data.data
      })
      .catch((err) => {
        this.errHandle(err, '获取数据失败')
      })
  },
  methods: {
    examine: function (ids, ok) {
      var params = {}
      params.ids = ids
      params.ok = ok
      this.axios.get('/server/api/admin/member/examine', { params: params })
        .then((res) => {
          this.$message.success('操作成功')
          this.member_get()
        })
        .catch((err) => {
          this.errHandle(err)
        })
    },
    member_get: function () { // 获取会员列表
      var params = {}
      params.status = 2
      if (this.adressFilter.region) {
        params.region = this.adressFilter.region
      } else if (this.adressFilter.city) {
        params.city = this.adressFilter.city
      } else if (this.adressFilter.province) {
        params.province = this.adressFilter.province
      }

      this.axios.get('/server/api/admin/member/list', { params })
        .then((res) => {
          this.data.member = res.data.data
        })
        .catch((err) => {
          this.errHandle(err, '获取数据失败')
        })
    },
    province_select: function (val) { // 选中省
      if (window.localStorage.province !== val) {
        this.adressFilter.city = null
        this.adressFilter.region = null
      }
      window.localStorage.province = val
    },
    city_select: function (val) { // 选中城市
      if (window.localStorage.city !== val) {
        this.adressFilter.region = null
      }
      window.localStorage.city = val
    },
    region_select: function (val) {
      this.adressFilter.region = window.localStorage.region = val
    },
    // 获取省数据
    province_data: function () {
      var province = []
      for (var v of ChinaAddressV4Data) {
        if (typeof v.parent === 'undefined') {
          province.push(v)
        }
      }
      return province
    },

    // 初始化地区数据
    region_init: function () {
      this.addressData.province = []
      this.addressData.region = {}
      for (var v of ChinaAddressV4Data) {
        if (v.parent) {
          if (typeof this.addressData.region[v.parent] === 'undefined') {
            this.addressData.region[v.parent] = []
          }
          this.addressData.region[v.parent].push(v)
        } else {
          this.addressData.province.push(v)
        }
      }
    },
    region_change: function (code) {
      // 省
      const province = parseInt(code / 10000) * 10000 + '' // 省
      const city = parseInt(code / 100) * 100 + '' // 市
      code = code + ''
      const fullcode = [province, city, code]

      var data = ''
      for (var v of fullcode) {
        if (v === fullcode[0]) {
          data += this.region_find(v)
        } else {
          data += ' ' + this.region_find(v)
        }
      }
      return data
    },
    region_find: function (code) {
      for (var v of ChinaAddressV4Data) {
        if (v.value === code) {
          return v.name
        }
      }

      return null
    },

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
