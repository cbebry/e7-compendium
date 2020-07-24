<template>
  <div id="app">
    <navigation class="fixed-top"></navigation>
    <router-view/>
    <the-footer class="fixed-bottom"></the-footer>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'app',
  components: {
    Navigation,
    TheFooter
  },
}

</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #B0BBC8;
}
body {
  background-color: #252B35;
}

</style>
