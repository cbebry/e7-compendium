<template>
  <div class="guides">
    <img alt="Vue logo" src="../assets/logo.png">
    <global-search></global-search>
  </div>
</template>

<script>
import GlobalSearch from '@/components/GlobalSearch.vue'

export default {
    name: 'guides',
    components: {
        GlobalSearch
    }
}
</script>

<style scoped lang="less">
@import '~../less/variables.less';
.guides {

}
.search {
    background: linear-gradient(to bottom, @bgcolor, white);
}
</style>
