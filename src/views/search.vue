<template>
  <div class="search">
    <h1/>

    <!-- Page content divided for future side drawer -->
    <div id="searchContent">
      <div class="container grid-side-500">
        <div class="d-flex justify-content-center">
          <!-- Tag searching section -->
          <div>
            <b-form-tags v-model="tags" no-outer-focus class="input-form">
              <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, addTag, removeTag }">
                <b-input-group class="search-form">
                  <b-form-input
                    v-model="text"
                    v-bind="inputAttrs"
                    v-on:keyup="changeTags"
                    placeholder="New tag - Press enter to add"
                    class="search-form"
                  ></b-form-input>
                </b-input-group>
                <div class="d-inline-block" style="font-size: 1.5rem;">
                  <b-form-tag
                    v-for="tag in tags"
                    @remove="removeTag(tag)"
                    :key="tag"
                    :title="tag"
                    :variant="tagVariant"
                    class="tag"
                  >{{ tag }}</b-form-tag>
                </div>
              </template>
            </b-form-tags>
          </div>
        </div>
        <!-- Nav bar section -->
        <b-row class="justify-content-md-center">
          <!-- Nav bar for future table sorting and column idenfitication -->
          <b-navbar type="dark" variant="dark" class="dropdownBar">
              <b-navbar-nav align="center" small justify class="dropdownItems">
                <b-nav-text><b>Sort:</b></b-nav-text>
                <b-nav-item></b-nav-item>
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
                <b-nav-item>Atk</b-nav-item>
                <b-nav-item>HP</b-nav-item>
                <b-nav-item>Def</b-nav-item>
                <b-nav-item>Spd</b-nav-item>
              </b-navbar-nav>
            </b-navbar>
          <!-- Nav bar END -->
        </b-row>
        <h1 />
        <!-- Table section -->
        <b-row class="justify-content-md-center">
          <div>
            <!-- B-table allows us to actively sort items and select items in the table -->
            <b-table
            small
            :items="printHeroes"
            :fields="fields"
            responsive="sm"
            class="table"
            selectable
            select-mode="single"
            borderless
            thead-class="hidden_header"
            @row-clicked="loadDetailed"
            >
            <!-- loadDetailed function call when a row is clicked -->
            <!-- Template to reformat links for hero portraits -->
            <template v-slot:cell(Face_URL)="data">
              <img :src="data.value">
            </template>
            </b-table>
          </div>
        </b-row>
      </div>
    </div>


  </div>
</template>

<script>
import heroData from '../assets/hero-data.json'
import heroSearchService from '@/services/hero-search.service'

export default {
    name: 'search',
    components: {

    },

    data() {
        return {
            // Raw JSON call
            heroData: heroData,
            /* Form input text
               Should use this to actively sort my name or any other non-tag attribute */
            text: '',
            /* Array of tags
               Keeps track of active tags
               Strings added to this array will display as an active tag
               # Need to find a way to organize Tags added [ie. 'Fire' should be able to be recognized as an element tag]
               # Maybe use keys??? */
            tags: [],
            /* Table columns
               In order to add columnns they must have the coresponding key stored here
               tdClass handles indivisual CSS formatting
               # Name column is listed seperately since if all the columns are set to the same width it normalizes the table spacing again (may remove) */
            fields: [
              { key: 'ID',
                tdClass: 'tableColumn' },
              { key: 'Face_URL',
                tdClass: 'tableColumn' },
              { key: 'Name',
                tdClass: 'NameColumn' },
              { key: 'Element',
                tdClass: 'tableColumn' },
              { key: 'Class',
                tdClass: 'tableColumn' },
            ],
            /* Tags accepted by the tag input form */
            acceptedTags: [
                // Elements
                'Fire', 'Ice', 'Earth', 'Light', 'Dark'
                // Add organized rows of tags here ...
                //
                //
            ],

            /* Old */
            /* Redundant START */
            selected: [],
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
            /* Redundant END */
            /* Required by Element switchbox */
            elementOptions: [
                { text: 'Fire', value: 'fire', symbol: 'symbol/icon_fire.png' },
                { text: 'Earth', value: 'earth', symbol: 'symbol/icon_earth.png' },
                { text: 'Ice', value: 'ice', symbol: 'symbol/icon_ice.png' },
                { text: 'Light', value: 'light', symbol: 'symbol/icon_light.png' },
                { text: 'Dark', value: 'dark', symbol: 'symbol/icon_dark.png' }
            ],
            /* Required by Class switchbox */
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
            /* Required by Grade switchbox */
            gradeOptions: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '5', value: '5' }
            ],
            heroSearchResults: []
        }
    },
    methods: {
        // Hero search service call
        search() {
            return heroSearchService.search(this.heroSearchForm).then((results) => {
                this.heroSearchResults = results
            })
        },
        renderSymbol(symbol) {
            return require(`@/assets/${symbol}`)
        },
        /* Keycode 13 === 'Enter'
           Keycode 8  === 'Backspace'
           When the form input reads an enter input checks the current text input
           and verifies that it is a valid tag then adds and clears the text input section */
        changeTags(e) {
          if (e.keyCode === 13 && this.text != ""){
            for(var i = 0; i < this.acceptedTags.length; i++)
              if(this.text.toUpperCase() == this.acceptedTags[i].toUpperCase()){
                this.tags.push(this.acceptedTags[i]);
                this.text = '';
                break;
              }
          }
          /* Else if the form input reads a backspace input and the input section is empty
             removes the last tag added instead */
          else if (e.keyCode === 8 && this.text == ""){
            this.tags.pop();
          }
          // this.search();
        },
        /* Function is emitted when a table row is clicked */
        loadDetailed(e){
          // prints out row's character ID
          console.log(e.ID);
          // Runs sidebarToggle function to adjust for detailed view
          this.sidebarToggle();
        },
        // Changes the margin of the main content to make room for side drawer content
        sidebarToggle(){
          // Returns to normal possition
          if(document.getElementById("searchContent").style.marginRight == "50vw"){
            document.getElementById("searchContent").style.transitionDuration = "0.35s";
            document.getElementById("searchContent").style.marginRight = "";
          }
          // Moves Left
          else {
            document.getElementById("searchContent").style.transitionDuration = "0.35s";
            document.getElementById("searchContent").style.marginRight = "50vw";
          }
        },
    },
    computed: {
      /* Returns an array which is read by the b-table component and displayed
         heroData.map(hero... : loads the JSON into a readable format
         return function returns a keyed array which b-table can read necessary data into a viewable format
         All keys are case-sensitive and must match the properties of the hero object exactly! */
      printHeroes() {
        /* Sorting print heroes function here? */
        return heroData.map((hero) => {
          if(hero.Name != ""){
            return {"ID": hero.ID,
                    "Name": hero.Name,
                    "Face_URL": hero.Face_URL,
                    "Element": hero.Element,
                    "Class": hero.Class
                  };
          }
        })
      },
      /* Now that searching is unified similarly classified artifacts will be printed
         in a divided section below the heroes */
      printArtifacts() {
        return null;
      },
      /* Print items */
      printItems() {
        return null;
      },
      /* Print etc... */
    }
}
</script>

<style>
@import '~../less/variables.less';
.search {
    margin-top: 3vh;
    background: #252b35;
}
/* Tag searching form input */
.input-form {
    width: 30vw;
    background-color: #252b35;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}
.search-form {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}
.search-form :focus {
    background-color: #222731;
    color: #f1f1f1;
    box-shadow: none !important;
    border: 0;
}
/* Nav Bar */
.dropdownBar {
  border: 1px solid #222731;
  border-radius: 3px;
  box-shadow: none !important;
  outline: 0;
  height: 3.5vh;
  max-width: 100vw;
  width: 700px;
}
.dropdownItems {
  width: 700px;
  max-width: 80vw;
}
.switchbox {
  color:  #f1f1f1;
  padding-left: 10px;
}
/* b-table */
.tag {
  font-size: 14px;
  background-color: #222731;
  border: 1px solid #f1f1f1;
  border-radius: 3px;
  box-shadow: none !important;
  outline: 0;

}
.table{
  color: #f1f1f1;
  background-color: #252b35;
  box-shadow: none !important;
  border: 0;
}
.hidden_header {
  display: none;
}
.tableColumn {
  width: 100px !important;
  font-size: 10px;
}
.navDrawer{
  width: 50vw;
}

/* Mobile only specifications */
@media only screen and (max-width: 600px) {
  .navDrawer{
    width: 100vw;
  }
  .input-form {
    width: 100vw;
  }
}
/* Reserved for side drawer content */
.detailedContent {
}
</style>
