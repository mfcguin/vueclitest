<template>
  <div>
    <tabbar v-show="$store.state.isTabbarShow" :list="list" ref="mytabbar"></tabbar>

    <transition mode="out-in" :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'

export default {
  name: 'App',
  components: {
    Tabbar
  },
  mounted () {

  },
  data () {
    return {
      transitionName: 'slide-right',
      list: [{
        filmId: 1,
        name: '电影',
        to: '/films',
        iconfont: 'icon-all'
      },
      {
        filmId: 2,
        name: '影院',
        to: '/cinemas',
        iconfont: 'icon-comments'
      }, {
        filmId: 3,
        name: '我的',
        to: '/center',
        iconfont: 'icon-account'
      }]
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  //overflow-x: hidden;
}

ul {
  list-style: none;
}

.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
  //transform: translate(100%);
}

.slide-left-enter, .slide-left-leave-to {
  opacity: 0;
  //transform: translate(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all .5s ease;
}

.router-link-active {
  color: red;
}

.my-active {
  color: blue;
}

section {
  padding-bottom: 2.613rem;
}
</style>
