<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      offset="10"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell v-for="item in list" :key="item.filmId" @click="handleChange(item.filmId)">
        <img :src="item.poster" alt="">
        <div class="title">{{ item.name }}</div>
        <div class="content">
          <div :class="item.grade?'':'hidden'">
            观众评分:<span style="color: red">{{ item.grade }}</span>
          </div>

          <div class="actors">主演： {{ item.actors | actorsFilter }}</div>
          <div>{{ item.nation }} | {{ item.runtime }}分钟</div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapState } from 'vuex'

Vue.filter('actorsFilter', data => {
  if (data === undefined) return '暂无主演'
  return data.map((item) => item.name).join(' ')
})

export default {
  name: 'Nowplaying',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0
    }
  },
  computed: {
    ...mapState(['cityId'])
  },
  created () {
    // this.$http.get('/api/test').then(res => this.list = res.data.data.films);
  },
  mounted () {
    axios({
      url:
        `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=5196770`,
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res.data.data.films)
      this.list = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    handleChange (id) {
      // this.$router.push(`/detail/${id}`);
      this.$router.push({
        name: 'detail',
        params: {
          id
        },
        query: {
          a: '1'
        }
      })
    },
    onLoad () {
      console.log('觸底了')

      if (this.list.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }

      this.current++
      axios({
        url:
          `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=5196770`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        console.log(res.data.data.films)
        // this.list = res.data.data.films
        this.list = [...this.list, ...res.data.data.films]
        // this.list = this.list.concat(res.data.data.films);
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-list {
  padding-bottom: 50px;

  .van-cell {
    overflow: hidden;
    padding: 0.8rem;

    img {
      width: 3.52rem;
      float: left;
    }

    .title {
      font-size: 16px;
    }

    .content {
      font-size: 13px;
      color: gray;

      .actors {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 10.667rem;
      }
    }
  }
}

.hidden {
  visibility: hidden;
}
</style>
