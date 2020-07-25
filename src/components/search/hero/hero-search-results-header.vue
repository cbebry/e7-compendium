<template>
    <div class="hero-search-results-header">
        <div class="hero-search-results-header-col">
            IMG
        </div>
        <div class="hero-search-results-header-col">
            Name
        </div>
        <div class="hero-search-results-header-col">
            Class
        </div>
        <div class="hero-search-results-header-col">
            Grade
        </div>
        <div class="hero-search-results-header-col">
            Element
        </div>
    </div>
</template>

<script>
export default {
    name: 'hero-search-results-header'
}
</script>

<style scoped lang="less">
.hero-search-results-header {
    display: flex;
}
.hero-search-results-header-col {
    flex: 1;
    text-decoration: underline;
    font-weight: bold;
}
</style>
