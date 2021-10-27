<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>

    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
<!--    <div class="swiper-button-prev"></div>-->
<!--    <div class="swiper-button-next"></div>-->

    <!-- 如果需要滚动条 -->
    <!--    <div class="swiper-scrollbar"></div>-->
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min'
// import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css'

export default {
  name: 'FilmSwiper',
  props: {
    loop: Boolean
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.initSwiper()
  },
  updated () {
  },
  methods: {
    initSwiper () {
      this.scroll = new Swiper('.swiper-container', {
        loop: this.loop, // 循环模式选项

        pagination: {
          el: '.swiper-pagination'
        },

        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },

        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      })
    }
  }

}
</script>

<style scoped>
.swiper-container {
  position: relative;
  overflow-x: hidden;
}
</style>
