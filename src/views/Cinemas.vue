<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow ref="navbar" @click-left="handleLeft" @click-right="handleRight">
      <template #left>
        {{ cityName }}
        <van-icon name="arrow-down"></van-icon>
      </template>
      <template #right>
        <van-icon name="search" size="18" color="black"/>
      </template>
    </van-nav-bar>
    <div class="box" :style="{height}">
      <cinemas :cinemaList="cinemaList"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import BetterScroll from 'better-scroll'
import Cinemas from '@/components/Cinemas'

export default {
  name: 'Clinemas',
  components: {
    Cinemas
  },
  data () {
    return {
      height: 0,
      scroll: null
    }
  },
  computed: {
    ...mapState({
      cityName: 'cityName',
      cityId: 'cityId',
      cinemaList: state => {
        return state.cinemaList
      }
    })
  },
  methods: {
    ...mapActions(['getCinemaData']),
    ...mapMutations(['clearCinema']),
    handleLeft () {
      this.$router.push('/city')

      // 清空cinemaList
      this.clearCinema()
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  },
  mounted () {
    // 动态计算高度
    this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight -
      this.$refs.navbar.$el.offsetHeight +
      'px'

    if (this.cinemaList.length === 0) {
      this.getCinemaData(this.cityId).then(() => {
        this.$nextTick(() => {
          this.scroll = new BetterScroll('.box', {
            scrollbar: {
              fade: true,
              interactive: false // 1.8.0 新增
            }
          })
        })
      })
    } else {
      this.$nextTick(() => {
        this.scroll = new BetterScroll('.box', {
          scrollbar: {
            fade: true,
            interactive: false // 1.8.0 新增
          }
        })
      })
    }

    // http({
    //   url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=5121167`,
    //   headers: {
    //     'X-Host': 'mall.film-ticket.cinema.list'
    //   }
    // }).then(res => {
    //   this.cinemaList = res.data.data.cinemas;
    //
    //   this.$nextTick(() => {
    //     new BetterScroll('.box', {
    //       scrollbar: {
    //         fade: true,
    //         interactive: false // 1.8.0 新增
    //       },
    //     });
    //   });
    // });
  }
}
</script>

<style lang="scss" scoped>
.box {
  overflow: hidden;
  position: relative;
}
</style>
