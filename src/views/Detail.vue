<template>
  <div style="overflow-x: hidden" v-if="filmInfo">
    <detail-header v-scroll="50">
      {{ filmInfo.name }}
    </detail-header>
    <!--    <img :src="filmInfo.poster" alt="">-->
    <div :style="{backgroundImage:'url(' + filmInfo.poster +  ')'}" class="poster">

    </div>
    <div class="content">
      <div> {{ filmInfo.name }}</div>
      <div>
        <div class="detail-text"> {{ filmInfo.category }}</div>
        <div class="detail-text">{{ filmInfo.premiereAt | dateFilter }}</div>
        <div class="detail-text">{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</div>
        <div class="detail-text" style="line-height: 15px" :class="{hidden:isHidden}">
          {{ filmInfo.synopsis }}
        </div>
        <div style="text-align: center">
          <i class="iconfont" :class="isHidden ? 'icon-moreunfold' : 'icon-less'" @click="isHidden = !isHidden"></i>
        </div>
      </div>
    </div>

    <div style="padding:0.8rem">
      <div style="margin: 0.267rem 0">演职人员</div>
      <detail-swiper class="actors" name="actors">
        <detail-swiper-item v-for="(item,index) in filmInfo.actors" :key="index">
          <div
            :style="{
                backgroundImage: 'url(' + item.avatarAddress + ')',
              }"
            class="avatar"
          >
          </div>
          <div style="text-align:center;font-size:12px">{{ item.name }}</div>
          <div style="text-align:center;font-size:13px">{{ item.role }}</div>
        </detail-swiper-item>
      </detail-swiper>
    </div>

    <div style="padding:0.8rem">
      <div style="margin: 0.267rem 0">剧照</div>
      <detail-swiper class="photos" name="photos" slidesPerView="2">
        <detail-swiper-item v-for="(item,index) in filmInfo.photos" :key="index">
          <div
            class="photo"
            :style="{
                backgroundImage: 'url(' + item + ')',
              }"
            @click="handlePreview(index)"
          >

          </div>
        </detail-swiper-item>
      </detail-swiper>
    </div>

  </div>
</template>

<script>
import http from '@/utils/http'
import moment from 'moment'
import Vue from 'vue'
import { ImagePreview } from 'vant'
import mixinObj from '@/utils/mixinObj'
import DetailHeader from '@/components/detail/DetailHeader'
import DetailSwiper from '@/components/detail/DetailSwiper'
import DetailSwiperItem from '@/components/detail/DetailSwiperItem'

Vue.filter('dateFilter', date => {
  return moment(date * 1000).format('YYYY-MM-DD')
})

Vue.directive('scroll', {
  inserted (el, binding) {
    // el.style.display = 'none';
    el.style.opacity = 0
    el.callback = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        // el.style.display = 'block';
        el.style.opacity = 1
      } else {
        // el.style.display = 'none';
        el.style.opacity = 0
      }
    }

    window.addEventListener('scroll', el.callback)
  },
  unbind (el) {
    window.removeEventListener('scroll', el.callback)
  }
})

export default {
  name: 'Detail',
  mixins: [mixinObj],
  components: {
    DetailSwiper,
    DetailSwiperItem,
    DetailHeader
  },
  data () {
    return {
      filmInfo: null,
      isHidden: true
    }
  },
  mounted () {
    // document.body.addEventListener('scroll', this.scroll);
  },
  destroyed () {
    // document.body.removeEventListener('scroll', this.scroll);
  },
  created () {
    // axios 利用 id 发请求到详情接口 ，获取详细数据 ，布局页面
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=5501344`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left'

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 11.2rem;
  background-position: center;
  background-size: cover;
}

.content {
  padding: 0.8rem;

  .detail-text {
    color: #797d82;
    font-size: 13px;
    margin-top: 0.267rem;
  }
}

.hidden {
  overflow: hidden;
  height: 30px;
}

.avatar {
  width: 100%;
  height: 4.722222rem;
  background-position: center;
  background-size: cover;
}

.photo {
  width: 100%;
  height: 4.267rem;
  background-position: center;
  background-size: cover;
}
</style>
