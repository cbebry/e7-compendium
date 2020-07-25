<template>
    <div class="search">
        <div class="search-form">
            <label for="search-form-name">
                Name:
                <b-form-input
                    id="search-form-name"
                    v-model="heroSearchForm.name"
                    placeholder="Name"
                    trim
                ></b-form-input>
            </label>

            <b-form-group label="Grade(s)">
                <b-form-checkbox-group
                    v-model="heroSearchForm.grades"
                    :options="gradeOptions"
                    buttons
                ></b-form-checkbox-group>
            </b-form-group>

            <b-form-group label="Role(s)">
                <b-form-checkbox-group
                    v-model="heroSearchForm.roles"
                    :options="roleOptions"
                    buttons
                ></b-form-checkbox-group>
            </b-form-group>

            <b-form-group label="Element(s)">
                <b-form-checkbox-group
                    v-model="heroSearchForm.elements"
                    :options="elementOptions"
                    buttons
                ></b-form-checkbox-group>
            </b-form-group>

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

import HeroSearchResultsHeader from '@/components/search/hero/hero-search-results-header'
import HeroSearchResult from '@/components/search/hero/hero-search-result'
import HeroSearchNoResults from '@/components/search/hero/hero-search-no-results'
export default {
    name: 'search',
    components: {
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
                { text: 'Warrior', value: 'warrior' },
                { text: 'Knight', value: 'knight' },
                { text: 'Ranger', value: 'ranger' },
                { text: 'Thief', value: 'thief' },
                { text: 'Mage', value: 'mage' },
                { text: 'Soul Weaver', value: 'soul weaver' }
            ],
            elementOptions: [
                { text: 'Fire', value: 'fire' },
                { text: 'Earth', value: 'earth' },
                { text: 'Ice', value: 'ice' },
                { text: 'Light', value: 'light' },
                { text: 'Dark', value: 'dark' }
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
                console.log(results)
                this.heroSearchResults = results
            })
        },
        clearSearch() {
            this.heroSearchResults = []
            this.heroSearchForm.name = ''
            this.heroSearchForm.elements = []
            this.heroSearchForm.roles = []
            this.heroSearchForm.grades = []
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
