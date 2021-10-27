<template>
  <div>
    请先登陆
    <button @click="handleLogin">登陆</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {}
  },
  methods: {
    handleLogin () {
      localStorage.setItem('token', '后端返回的token字段')
      const redirectUrl = this.$route.query.redirect
      this.$router.push(redirectUrl)
    }
  }
}
</script>

<style scoped>

</style>
