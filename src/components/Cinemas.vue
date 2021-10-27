<template>
  <ul>
    <li v-for="data in cinemaList" :key="data.cinemaId">
      <div class="left">
        <div class="cinema_name">{{ data.name }}</div>
        <div class="cinema_text">{{ data.address }}</div>
      </div>
      <div class="right cinema_name">
        <div style="color: red">￥{{ data.lowPrice / 100 }}起</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Cinemas',
  props: {
    cinemaList: Array
  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
@import "../assets/base";

li {
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;

  .cinema_name {
    font-size: 15px;
  }

  .cinema_text {
    width: 11.307rem;
    @include nowrap;
    margin-top: 5px;
    @include common-text;
  }
}

.box {
  overflow: hidden;
  position: relative;
}
</style>
