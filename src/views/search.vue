<template>
    <div class="search">
        <div class="search-form">
            <!-- Get Name -->
            <label for="search-form-name">
                Name:
                <b-form-input
                    id="search-form-name"
                    v-model="heroSearchForm.name"
                    placeholder="Name"
                    trim
                ></b-form-input>
            </label>

            <!-- Get Grade -->
            <b-form-group label="Grade(s)">
                <b-form-checkbox-group
                    v-model="heroSearchForm.grades"
                    :options="gradeOptions"
                    buttons
                ></b-form-checkbox-group>
            </b-form-group>
            <!-- Get Role -->
            <b-form-group label="Role(s)" id="classtag">
                <b-form-checkbox-group v-model="heroSearchForm.roles" buttons>
                    <b-form-checkbox
                        v-for="roleOption in roleOptions"
                        :key="roleOption.value"
                        :value="roleOption.value"
                    >
                        <img :src="renderSymbol(roleOption.symbol)" :alt="roleOption.text" />
                    </b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <!-- Get Element -->
            <search-filter-elements
                @elementSelection="onElementSelection"
                v-model="heroSearchForm.elements"
            ></search-filter-elements>

            <b-button @click="clearSearch()" variant="danger">Clear</b-button>
            <b-button @click="search()" variant="primary">Search</b-button>
        </div>
        <hr />
        <div>
            <div class="hero-search-results">
                <hero-search-results-header></hero-search-results-header>
                <hero-search-result
                    v-for="heroSearchResult in heroSearchResults"
                    :key="heroSearchResult.ID"
                    :hero="heroSearchResult"
                ></hero-search-result>
                <hero-search-no-results
                    v-show="heroSearchResults.length === 0"
                ></hero-search-no-results>
            </div>
        </div>
    </div>
</template>

<script>
import heroSearchService from '@/services/hero-search.service'

import SearchFilterElements from '@/components/search/search-filter-elements'

import HeroSearchResultsHeader from '@/components/search/hero/hero-search-results-header'
import HeroSearchResult from '@/components/search/hero/hero-search-result'
import HeroSearchNoResults from '@/components/search/hero/hero-search-no-results'
export default {
    name: 'search',
    components: {
        SearchFilterElements,
        HeroSearchResultsHeader,
        HeroSearchResult,
        HeroSearchNoResults
    },
    data() {
        return {
            gradeOptions: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '5', value: '5' }
            ],
            roleOptions: [
                { text: 'Warrior', value: 'warrior', symbol: 'symbol/icon_class_warrior.png' },
                { text: 'Knight', value: 'knight', symbol: 'symbol/icon_class_knight.png' },
                { text: 'Ranger', value: 'ranger', symbol: 'symbol/icon_class_ranger.png' },
                { text: 'Thief', value: 'thief', symbol: 'symbol/icon_class_thief.png' },
                { text: 'Mage', value: 'mage', symbol: 'symbol/icon_class_mage.png' },
                {
                    text: 'Soul Weaver',
                    value: 'soul weaver',
                    symbol: 'symbol/icon_class_soulweaver.png'
                }
            ],
            elementOptions: [
                { text: 'Fire', value: 'fire', symbol: 'symbol/icon_fire.png' },
                { text: 'Earth', value: 'earth', symbol: 'symbol/icon_earth.png' },
                { text: 'Ice', value: 'ice', symbol: 'symbol/icon_ice.png' },
                { text: 'Light', value: 'light', symbol: 'symbol/icon_light.png' },
                { text: 'Dark', value: 'dark', symbol: 'symbol/icon_dark.png' }
            ],
            heroSearchForm: {
                name: '',
                elements: [],
                roles: [],
                grades: []
            },
            heroSearchResults: []
        }
    },
    methods: {
        search() {
            return heroSearchService.search(this.heroSearchForm).then((results) => {
                this.heroSearchResults = results
            })
        },
        clearSearch() {
            this.heroSearchResults = []
            this.heroSearchForm.name = ''
            this.heroSearchForm.elements = []
            this.heroSearchForm.roles = []
            this.heroSearchForm.grades = []
        },
        renderSymbol(symbol) {
            return require(`@/assets/${symbol}`)
        },
        onElementSelection(value) {
            this.heroSearchForm.elements = value
        }
    }
}
</script>

<style scoped lang="less">
@import '~../less/variables.less';
.search {
    background: linear-gradient(black, 1vh, @bgcolor);
}
</style>
