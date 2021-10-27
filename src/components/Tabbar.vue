<template>
  <footer>
    <ul>
      <router-link :to="item.to" v-for="item in list" custom :key="item.filmId" v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive ? 'wkactive' : ''">
          <i :class="['iconfont',item.iconfont]"></i>
          <span>{{ item.name }}</span>
        </li>
      </router-link>
    </ul>
  </footer>
</template>

<script>
import '@/assets/iconfont/iconfont.css'

export default {
  name: 'Tabbar.vue',
  props: {
    list: Array
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 2.613rem;
  background: white;
  z-index: 999;

  ul {
    display: flex;

    li {
      flex: 1;
      line-height: 1.333rem;
      text-align: center;
      display: flex;
      flex-direction: column;

      i {
        font-size: 20px;
      }

      span {
        font-size: 16px;
      }
    }
  }

  .wkactive {
    color: red;
  }

}
</style>
