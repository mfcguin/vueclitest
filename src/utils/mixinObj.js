const obj = {
  created () {
    console.log(666)
    this.$store.commit('hide')
  },
  destroyed () {
    console.log(777)
    this.$store.commit('show')
  },
  methods: {}
}

export default obj
