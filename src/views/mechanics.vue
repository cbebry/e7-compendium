<template>
  <div class="mechanics">
    <img alt="Vue logo" src="../assets/logo.png">
    <global-search></global-search>
  </div>
</template>

<script>
import GlobalSearch from '@/components/GlobalSearch.vue'

export default {
    name: 'mechanics',
    components: {
        GlobalSearch
    }
}
</script>

<style scoped lang="less">
@import '~../less/variables.less';

.search {
    background: linear-gradient(to bottom, @bgcolor, white);
}
.mechanics {
    background: linear-gradient(to bottom, @bgcolor, white);
}
</style>
