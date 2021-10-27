<template>
  <div class="header">
    <i class="iconfont icon-back" @click="handleBack"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.347rem;
  line-height: 2.347rem;
  background-color: white;
  text-align: center;
  transition: opacity .5s ease;

  i {
    font-size: 30px;
    position: fixed;
    left: 0.267rem;
    top: 0;
    height: 2.347rem;
    line-height: 2.347rem;
  }
}

</style>
