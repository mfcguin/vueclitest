<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min'
// import 'swiper/swiper.min.css'
import 'swiper/swiper-bundle.css'

export default {
  name: 'DetailSwiper',
  props: {
    name: {
      type: [String],
      default: 'swiper-container'
    },
    slidesPerView: {
      type: [Number, String],
      default: 3.5
    },
    spaceBetween: {
      type: [Number, String],
      default: 30
    }
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
      console.log(this.name)
      this.scroll = new Swiper(`.${this.name}`, {
        slidesPerView: this.slidesPerView,
        spaceBetween: this.spaceBetween,
        freeMode: true
      })
    }
  }

}
</script>

<style scoped>
.swiper-container {
  position: relative;
}
</style>
