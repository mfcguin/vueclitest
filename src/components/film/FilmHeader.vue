<template>
  <ul>
    <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" >
        <span :class="isActive ? 'wkactive' : ''">正在热映</span>
      </li>
    </router-link>

    <router-link to="/films/comingsoon" custom v-slot="{ navigate, isActive }">
      <li @click="navigate" >
        <span :class="isActive ? 'wkactive' : ''">即将上映</span>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'FilmHeader'
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  height: 2.613rem;
  line-height: 2.613rem;

  li {
    flex: 1;
    text-align: center;
  }
}

.wkactive {
  color: red;
  border-bottom: 2px solid red;
}
</style>
