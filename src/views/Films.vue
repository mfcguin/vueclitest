<template>
  <div>
    <film-swiper :loop="false" :key="list.length">
      <film-swiper-item class="swiperitem" v-for="item in list" :key="item.id">
        <img :src="item.imgUrl"/>
      </film-swiper-item>
    </film-swiper>

    <film-header class="sticky"></film-header>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import FilmSwiper from '@/components/film/FilmSwiper'
import FilmSwiperItem from '@/components/film/FilmSwiperItem'
import FilmHeader from '@/components/film/FilmHeader'

export default {
  components: {
    FilmSwiper,
    FilmSwiperItem,
    FilmHeader
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    // setTimeout(() => {
    //   this.list = ["https://static.maizuo.com/pc/v5/usr/movie/e856bdc65507b99800f22e47801fa781.jpg",
    //     "https://static.maizuo.com/pc/v5/usr/movie/47aa5a3ad2ebff403d073288e4365694.jpg",
    //     "https://static.maizuo.com/pc/v5/usr/movie/8b0755547313706883acc771bda7709d.jpg"
    //   ];
    //
    // }, 1000);
  },
  mounted () {
    axios.get('/banner.json').then(res => {
      this.list = res.data.banner
    })
  },
  watch: {
    // '$route'(to, from) {
    //   console.log(666);
    // }

  }
}
</script>

<style lang="scss" scoped>
.swiperitem {
  img {
    width: 100%;
  }
}

.sticky {
  position: sticky;
  top: 0;
  background: white;
  z-index: 100;
}
</style>
