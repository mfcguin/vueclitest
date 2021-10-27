<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      ref="search"
    />

    <div class="box" :style="{height}">
      <cinemas :cinemaList="computedList"/>
    </div>
  </div>
</template>

<script>
import Cinemas from '@/components/Cinemas'
import BetterScroll from 'better-scroll'

export default {
  name: 'Search',
  components: {
    Cinemas
  },
  data () {
    return {
      value: '',
      height: 0,
      scroll: null
    }
  },
  computed: {
    computedList () {
      if (this.value.trim() !== '') {
        return this.$store.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.value))
      } else {
        return []
      }
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {
      this.$router.back()
    }
  },
  updated () {
    if (this.scroll) {
      this.scroll.refresh()
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - this.$refs.search.offsetHeight - document.querySelector('footer').offsetHeight + 'px'

    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaData').then(() => {
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
  }
}
</script>

<style scoped lang="scss">
.box {
  overflow: hidden;
  position: relative;
}
</style>
