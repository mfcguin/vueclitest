<template>
  <van-index-bar :index-list="computedList" @select="handleChange">
    <div v-for="data in cityList" :key="data.type">
      <van-index-anchor :index="data.type"/>
      <van-cell v-for="item in data.list" @click="handleClick(item)" :title="item.name" :key="item.cityId"/>
    </div>
  </van-index-bar>
</template>

<script>
import http from '@/utils/http'
import { Toast } from 'vant'
import mixinObj from '@/utils/mixinObj'

export default {
  name: 'City',
  mixins: [mixinObj],
  data () {
    return {
      cityList: []
    }
  },
  computed: {
    computedList () {
      return this.cityList.map(item => item.type)
    }
  },
  mounted () {
    // this.$store.commit('hide');
    http({
      url: '/gateway?k=5066709',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then((res) => {
      //   console.log(res.data.data.cities)
      this.cityList = this.renderCity(res.data.data.cities)
      // 1， 316条 ==> A ,B进行分组
      // 2.  利用转换后的数组，结合组件库进行渲染页面。
    })
  },

  methods: {
    renderCity (list) {
      const cityList = []
      const letterList = []
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }

      letterList.forEach(letter => {
        var newList = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        newList.length > 0 && cityList.push({
          type: letter,
          list: newList
        })
      })

      return cityList
    },
    handleChange (index) {
      // console.log(index);
      Toast(index)
    },
    handleClick (item) {
      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
.van-toast--html, .van-toast--text {
  min-width: 30px;
}
</style>
