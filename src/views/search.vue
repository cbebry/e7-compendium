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
          <b-col col lg="2">
            <b-dropdown text="Element" @click.stop="">
                <b-form-checkbox-group
                  v-model="selected"
                  :options="options"
                  switches
                  stacked
                ></b-form-checkbox-group>
            </b-dropdown>
          </b-col>
          <b-col cols="12" md="auto">
            <b-dropdown text="Element" @click.stop="">
                <b-form-checkbox-group
                  v-model="selected"
                  :options="options"
                  switches
                  stacked
                ></b-form-checkbox-group>
            </b-dropdown>
          </b-col>
          <b-col col lg="2">
            <b-dropdown text="Element" @click.stop="">
                <b-form-checkbox-group
                  v-model="selected"
                  :options="options"
                  switches
                  stacked
                ></b-form-checkbox-group>
            </b-dropdown>
          </b-col>
        </b-row>
      </div>



      <div class="container grid-side-500">
          <!-- Search Options -->
          <div class="row">
              <div class="col">
                  <!-- Get Name -->
                  <div>
                      <label for="search-form-name">
                          Name:
                          <b-form-input
                              id="search-form-name"
                              v-model="heroSearchForm.name"
                              placeholder="Name"
                              trim
                              class="input-form"
                          ></b-form-input>
                      </label>
                  </div>

                  <!-- ### Buttons update upon clicking elsewhere on the page ### -->
                  <!-- ### Appearence should update on click for clairity ### -->

                  <!-- ### Basic Options ### -->

                  <!-- Get Element Component -->
                  <div>
                      <search-filter-elements
                          @elementSelection="onElementSelection"
                          v-model="heroSearchForm.elements"
                      ></search-filter-elements>
                  </div>
                  <!-- Get Class Component -->
                  <div>
                      <search-filter-classes
                          @classSelection="onClassSelection"
                          v-model="heroSearchForm.classes"
                      ></search-filter-classes>
                  </div>
                  <!-- Get Grade Component -->
                  <!-- ### Number labels need to be fixed ### -->
                  <div>
                      <search-filter-grades
                          @gradeSelection="onGradeSelection"
                          v-model="heroSearchForm.grades"
                      ></search-filter-grades>
                  </div>

                  <!-- Search Results Options-->
                  <!-- ### Should become redundant as list will update on click ### -->
                  <div>
                      <b-button @click="clearSearch()" variant="danger">Clear</b-button>
                      <b-button @click="search()" variant="primary">Search</b-button>
                  </div>

                  <!-- ### Advanced Options ### -->
                  <hr />
                  --- Test components ---
                  <hr />
                  <!-- Get Zodiac Component -->

                  <!-- ### Trying to see what is best for visual clarity and ease of access ### -->
                  <!-- Get Imprint Component -->
                  <!--                    <div>-->
                  <!--                        <b-form-group id="input-group-3" label="Imprint:" label-for="input-3">-->
                  <!--                            <b-form-select-->
                  <!--                                id="input-3"-->
                  <!--                                class="input-form"-->
                  <!--                                v-model="heroSearchForm.imprint"-->
                  <!--                                :options="imprints"-->
                  <!--                                required-->
                  <!--                                multiple-->
                  <!--                            ></b-form-select>-->
                  <!--                        </b-form-group>-->
                  <!--                    </div>-->
                  <!--                    &lt;!&ndash; Get Imprint-Focus Component &ndash;&gt;-->
                  <!--                    <div>-->
                  <!--                        <b-form-checkbox v-model="checked" name="check-button" switch>-->
                  <!--                            Attack-->
                  <!--                        </b-form-checkbox>-->
                  <!--                        <b-form-checkbox v-model="checked" name="check-button" switch>-->
                  <!--                            Health-->
                  <!--                        </b-form-checkbox>-->
                  <!--                        <b-form-checkbox v-model="checked" name="check-button" switch>-->
                  <!--                            Defense-->
                  <!--                        </b-form-checkbox>-->
                  <!--                        <b-form-checkbox v-model="checked" name="check-button" switch>-->
                  <!--                            Speed-->
                  <!--                        </b-form-checkbox>-->
                  <!--                    </div>-->

                  <!-- Get Attribute Component -->
                  <!-- ### Placeholder for other sorting methods such as sorting by debuff etc. ### -->
              </div>
          </div>

          <!-- Search Results -->
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
          <!-- End Search Results -->
        </div>
    </div>
</template>

<script>
import heroSearchService from '@/services/hero-search.service'
import SearchFilterElements from '@/components/search/search-filter-elements'
import SearchFilterClasses from '@/components/search/search-filter-classes'
import SearchFilterGrades from '@/components/search/search-filter-grades'

import HeroSearchResultsHeader from '@/components/search/hero/hero-search-results-header'
import HeroSearchResult from '@/components/search/hero/hero-search-result'
import HeroSearchNoResults from '@/components/search/hero/hero-search-no-results'

import TagFilter from '@/components/search/tag-search'

export default {
    name: 'search',
    components: {
        TagFilter,
        SearchFilterElements,
        SearchFilterClasses,
        SearchFilterGrades,
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
            options: [
              { text: 'Red', value: 'red' },
              { text: 'Green', value: 'green' },
              { text: 'Yellow', value: 'yellow' },
              { text: 'Blue', value: 'blue' }
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
        onElementSelection(value) {
            this.heroSearchForm.elements = value
        },
        onClassSelection(value) {
            this.heroSearchForm.classes = value
        },
        onGradeSelection(value) {
            this.heroSearchForm.grades = value
        },
        onTagKeyUp(value) {
            this.heroSearchForm.name = value[0];
            console.log(value[0]);
            value.shift();
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
  display: block;
  text-align: left;
}
.input-form {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}

</style>
