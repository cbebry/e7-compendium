<template>
    <div class="search-filter-classes">
        <b-form-group label="Class(s)">
            <b-form-checkbox-group buttons v-model="selectedClasses">
                <b-form-checkbox
                    v-for="classOption in classOptions"
                    :key="classOption.value"
                    :value="classOption.value"
                    @change.native="selectClass"
                >
                    <img :src="renderSymbol(classOption.symbol)" :alt="classOptions.text" />
                </b-form-checkbox>
            </b-form-checkbox-group>
        </b-form-group>
    </div>
</template>

<script>
export default {
    name: 'search-filter-classes',
    props: ['value'],
    data() {
        return {
            selectedClasses: [],
            classOptions: [
                { text: 'Knight', value: 'knight', symbol: 'symbol/icon_class_knight.png' },
                { text: 'Warrior', value: 'warrior', symbol: 'symbol/icon_class_warrior.png' },
                { text: 'Ranger', value: 'ranger', symbol: 'symbol/icon_class_ranger.png' },
                { text: 'Thief', value: 'thief', symbol: 'symbol/icon_class_thief.png' },
                { text: 'Mage', value: 'mage', symbol: 'symbol/icon_class_mage.png' },
                {
                    text: 'Soul Weaver',
                    value: 'soulweaver',
                    symbol: 'symbol/icon_class_soulweaver.png'
                }
            ]
        }
    },
    methods: {
        renderSymbol(symbol) {
            return require(`@/assets/${symbol}`)
        },
        selectClass() {
            this.$emit('classSelection', this.selectedClasses)
        }
    },
    watch: {
        value() {
            this.selectedClasses = this.value
        }
    }
}
</script>

<style lang="less">
.search-filter-classes label {
    padding: 5px 8px;
    user-select: none;
    min-width: 18px;
    text-align: center;
    background: #2a313d;
    color: #a1aebd;
    border: 1px solid #222731;
    border-radius: 3px;
    box-shadow: none !important;
    outline: 0;
}

.search-filter-classes label.hover {
    background: #252b35;
}

.search-filter-classes label.active {
    background: #202225;
}
img {
    height: 18px;
    width: 18px;
    vertical-align: sub;
}
</style>
