<template>
    <div id="app">
        <navigation></navigation>
        <router-view />
    </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
    name: 'app',
    components: {
        Navigation
    }
}
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #b0bbc8;
}
body {
    overflow: hidden;
    background-color: #252b35;
}
</style>
