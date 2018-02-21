<template>
  <el-card class="member_chart">
    <div slot="header" class="clearfix">
      <span>会员统计</span>
      <!-- 地区筛选 -->
      <div class="select">
        <el-select v-model="adressFilter.province" @change="province_select" class="item" placeholder="选择地区" size="mini" clearable>
          <el-option
            v-for="item in addressData.province"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>

        <el-select v-if="city" v-model="adressFilter.city" class="item" @change="city_select" placeholder="请选择" size="mini" clearable>
          <el-option
            v-for="item in city"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

    </div>
    <chart :options="polar"></chart>
  </el-card>

</template>

<script>
import Schart from 'vue-schart'
import ChinaAddressV4Data from '@/datas/china_address_v4.json'

export default {
  data () {
    return {
      canvasId: 'myCanvas',
      type: 'bar',
      width: 600,
      height: 400,
      addressData: {},
      adressFilter: {},
      polar: {
        title: {
          text: '世界人口总量',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['普通会员', '高级会员']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
          {
            name: '普通会员',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '高级会员',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      }
    }
  },
  components: {
    Schart
  },
  created: function () {
    this.region_init()
  },
  computed: {
    city: function () {
      var province = this.adressFilter.province
      return this.addressData.region[province]
    }
  },
  methods: {
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
    province_select: function (val) { // 选中省
      if (window.localStorage.t_province !== val) {
        this.adressFilter.city = null
      }
      window.localStorage.t_province = val
    },
    city_select: function (val) { // 选中城市
      window.localStorage.t_city = val

      this.axios.get('/server/api/admin/member/count', { params: { city: val } })
        .then((res) => {})
    }
  }
}
</script>

<style lang="scss" scoped="">
.member_chart {
  .select {
    float: right;
    display: flex;
    align-items: center;

    .item {
      margin-right: 10px;
    }
  }
}
</style>
