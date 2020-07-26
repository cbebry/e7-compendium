<template>
    <div class="search-filter-elements">
        <b-form-group label="Element(s)">
            <b-form-checkbox-group buttons v-model="selectedElements">
                <b-form-checkbox
                    v-for="elementOption in elementOptions"
                    :key="elementOption.value"
                    :value="elementOption.value"
                    @change.native="selectElement"
                >
                    <img :src="renderSymbol(elementOption.symbol)" :alt="elementOption.text" />
                </b-form-checkbox>
            </b-form-checkbox-group>
        </b-form-group>
    </div>
</template>

<script>
export default {
    name: 'search-filter-elements',
    props: ['value'],
    data() {
        return {
            selectedElements: [],
            elementOptions: [
                { text: 'Fire', value: 'fire', symbol: 'symbol/icon_fire.png' },
                { text: 'Earth', value: 'earth', symbol: 'symbol/icon_earth.png' },
                { text: 'Ice', value: 'ice', symbol: 'symbol/icon_ice.png' },
                { text: 'Light', value: 'light', symbol: 'symbol/icon_light.png' },
                { text: 'Dark', value: 'dark', symbol: 'symbol/icon_dark.png' }
            ]
        }
    },
    methods: {
        renderSymbol(symbol) {
            return require(`@/assets/${symbol}`)
        },
        selectElement() {
            this.$emit('elementSelection', this.selectedElements)
        }
    },
    watch: {
        value() {
            this.selectedElements = this.value
        }
    }
}
</script>

<style lang="less">
.search-filter-elements label {
    // Kuri! Do thing here
}
</style>
