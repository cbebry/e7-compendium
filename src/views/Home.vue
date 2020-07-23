<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <global-search></global-search>
  </div>
</template>

<script>
// @ is an alias to /src
import GlobalSearch from '@/components/GlobalSearch.vue'

export default {
  name: 'home',
  components: {
    GlobalSearch
  }
}
</script>

<style scoped lang="less">
@import '~../less/variables.less';

.home {
    background: linear-gradient(to bottom, @bgcolor, white);
}
</style>
