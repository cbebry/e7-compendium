<template>
    <div class="hero-search-result">
        <div class="hero-search-result-col">
            <img v-if="hero.Face_URL" :src="hero.Face_URL" />
            <span v-else>
                (N/A)
            </span>
        </div>
        <div class="hero-search-result-col">
            {{ hero.Name }}
        </div>
        <div class="hero-search-result-col">
            {{ hero.Class }}
        </div>
        <div class="hero-search-result-col">
            {{ hero.Grade }}
        </div>
        <div class="hero-search-result-col">
            {{ hero.Element }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'hero-search-result',
    props: ['hero']
}
</script>

<style scoped lang="less">
.hero-search-result {
    display: flex;
}
.hero-search-result-col {
    flex: 1;
}
</style>
