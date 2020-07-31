<template>
  <div class="search">
    <h1/>
    <div class="container grid-side-500">
      <div class="d-flex flex-row bd-highlight mb-3">
        <tag-filter
          class="filter"
          @filterUpdate="onTagKeyUp"
          v-model="heroSearchForm.tags"
        ></tag-filter>
      </div>
    </div>

    <div class="container grid-side-500">
      <b-row class="justify-content-md-center">

        <b-navbar type="dark" variant="dark" class="dropdownBar">
            <b-navbar-nav align="center" small justify class="dropdownItems">
              <b-nav-text><b>Sort:</b></b-nav-text>
              <b-nav-item>Name</b-nav-item>

              <b-nav-item-dropdown text="Element" @click.stop="">
                <b-form-checkbox-group
                  v-model="selected"
                  :options="elementOptions"
                  switches
                  stacked
                  class="switchbox"
                ></b-form-checkbox-group>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="Class" @click.stop="">
                <b-form-checkbox-group
                  v-model="selected"
                  :options="classOptions"
                  switches
                  stacked
                  class="switchbox"
                ></b-form-checkbox-group>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="Grade" @click.stop="">
                <b-form-checkbox-group
                  v-model="selected"
                  :options="gradeOptions"
                  switches
                  stacked
                  class="switchbox"
                ></b-form-checkbox-group>
              </b-nav-item-dropdown>

              <b-nav-item>Attack</b-nav-item>
              <b-nav-item>Health</b-nav-item>
              <b-nav-item>Defense</b-nav-item>
              <b-nav-item>Speed</b-nav-item>
            </b-navbar-nav>
          </b-navbar>

      </b-row>
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

    <!-- Search Results -->

    <!-- End Search Results -->
  </div>
</template>

<script>
import heroSearchService from '@/services/hero-search.service'

import HeroSearchResultsHeader from '@/components/search/hero/hero-search-results-header'
import HeroSearchResult from '@/components/search/hero/hero-search-result'
import HeroSearchNoResults from '@/components/search/hero/hero-search-no-results'

import TagFilter from '@/components/search/tag-search'

export default {
    name: 'search',
    components: {
        TagFilter,
        HeroSearchResultsHeader,
        HeroSearchResult,
        HeroSearchNoResults
    },
    data() {
        return {
            heroSearchForm: {
                name: '',
                elements: [],
                classes: [],
                grades: [],
                imprint: '',
                tags: []
            },
            imprints: [
                { text: 'Imprint', value: null },
                'Attack',
                'Defense',
                'Health',
                'Speed',
                'CritRate',
                'CritDamage',
                'Effectiveness',
                'Effect Resistance',
                'Dual Attack Chance',
                'Attack%',
                'Defense%',
                'Health%'
            ],

            heroSearchResults: [],
            selected: [], // Must be an array reference!
            gradeOptions: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '5', value: '5' }
            ],
            elementOptions: [
                { text: 'Fire', value: 'fire', symbol: 'symbol/icon_fire.png' },
                { text: 'Earth', value: 'earth', symbol: 'symbol/icon_earth.png' },
                { text: 'Ice', value: 'ice', symbol: 'symbol/icon_ice.png' },
                { text: 'Light', value: 'light', symbol: 'symbol/icon_light.png' },
                { text: 'Dark', value: 'dark', symbol: 'symbol/icon_dark.png' }
            ],
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
            ],

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
            this.heroSearchForm.classes = []
            this.heroSearchForm.grades = []
        },
        renderSymbol(symbol) {
            return require(`@/assets/${symbol}`)
        },
        onTagKeyUp(value) {
            this.heroSearchForm.name = value[0];
            console.log(value[0]);
            value.shift();
            this.tags = value;
            console.log(value);
        },
    }
}
</script>

<style scoped lang="less">
@import '~../less/variables.less';
.search {
    margin: auto;
    background: #252b35;
}
.filter {
  margin-top: 3vh;
  display: block;
  text-align: left;
}
.input-form {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}
.dropdownBar {
  border: 1px solid #222731;
  border-radius: 3px;
  box-shadow: none !important;
  outline: 0;
  height: 3.5vh;

}
.dropdownItems {

}
.switchbox {
    color: #f1f1f1;
    padding-left: 10px;
}

</style>
