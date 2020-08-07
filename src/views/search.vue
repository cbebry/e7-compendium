<template>
    <div class="search">
        <h1>Search</h1>

        <!-- Page content divided for future side drawer -->
        <div id="searchContent">
            <div class="container grid-side-500">
                <div class="d-flex justify-content-center">
                    <div>
                        <b-input-group class="search-form">
                            <b-form-input
                                v-model="text"
                                @keyup.enter="enterTag"
                                @keyup.backspace="backspaceTag"
                                placeholder="Search term"
                                class="search-form"
                            ></b-form-input>
                        </b-input-group>
                    </div>
                </div>
                <div role="group" class="search-tags-container" id="search-tags-container">
                    <output
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        aria-relevant="additions text"
                        class="sr-only"
                    >
                        {{ tagsSrOutput(tags) }}
                    </output>
                    <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
                        {{ tagRemoved }}
                    </div>
                    <div v-for="(tag, i) in tags" :key="tag.value" class="d-inline-block">
                        <img v-if="tag.symbol" :src="tagSymbol(tag)" aria-hidden="true" />
                        {{ tag.text }}
                        <button
                            aria-keyshortcuts="Delete"
                            type="button"
                            aria-label="Delete tag"
                            class="close b-form-tag-remove ml-1"
                            @click="tagDeleteButton(i)"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <!-- Nav bar section -->
                <b-row class="justify-content-md-center">
                    <!-- Nav bar for future table sorting and column identification -->
                    <b-navbar type="dark" variant="dark" class="dropdownBar">
                        <b-navbar-nav align="center" small justify class="dropdownItems">
                            <b-nav-text><b>Sort:</b></b-nav-text>
                            <b-nav-item></b-nav-item>
                            <b-nav-item>Name</b-nav-item>

                            <b-nav-item-dropdown text="Element" @click.stop="">
                                <b-form-checkbox-group
                                    v-model="heroSearchForm.elements"
                                    :options="elementOptions"
                                    switches
                                    stacked
                                    class="switchbox"
                                    @change.native="elementDropdownChanged"
                                ></b-form-checkbox-group>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown text="Class" @click.stop="">
                                <b-form-checkbox-group
                                    v-model="heroSearchForm.classes"
                                    :options="classOptions"
                                    switches
                                    stacked
                                    class="switchbox"
                                    @change.native="classDropdownChanged"
                                ></b-form-checkbox-group>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown text="Grade" @click.stop="">
                                <b-form-checkbox-group
                                    v-model="heroSearchForm.grades"
                                    :options="gradeOptions"
                                    switches
                                    stacked
                                    class="switchbox"
                                    @change.native="gradeDropdownChanged"
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
                            :items="heroSearchResults"
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
                                <img :src="data.value" />
                            </template>
                        </b-table>
                    </div>
                </b-row>
            </div>
        </div>
    </div>
</template>

<script>
import heroSearchService from '@/services/hero-search.service'

export default {
    name: 'search',
    components: {},
    data() {
        return {
            heroSearchResults: [],
            heroSearchForm: {
                name: '',
                elements: [],
                classes: [],
                grades: [],
                imprint: ''
            },
            /* Form input text
               Should use this to actively sort by name or any other non-tag attribute */
            text: '',
            /* Array of tags
               Keeps track of active tags
               Strings added to this array will display as an active tag
               # Need to find a way to organize Tags added [ie. 'Fire' should be able to be recognized as an element tag]
               # Maybe use keys??? */
            tags: [],
            /* Table columns
               In order to add columns they must have the corresponding key stored here
               tdClass handles individual CSS formatting
               # Name column is listed separately since if all the columns are set to the same width it normalizes the table spacing again (may remove) */
            fields: [
                { key: 'ID', tdClass: 'tableColumn' },
                { key: 'Face_URL', tdClass: 'tableColumn' },
                { key: 'Name', tdClass: 'NameColumn' },
                { key: 'Element', tdClass: 'tableColumn' },
                { key: 'Class', tdClass: 'tableColumn' }
            ],
            // Allowed dictionary of tag keywords
            tagMap: {},
            tagRemoved: '',

            /* Old */
            /* Redundant START */
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
            ]
        }
    },
    created() {
        this.loadTagMap()
        this.search()
    },
    methods: {
        /**
         * Adds Element, Class, and Grade options to the tag list.
         */
        loadTagMap() {
            this.addListToDictionary(this.elementOptions, 'Element', this.tagMap)
            this.addListToDictionary(this.classOptions, 'Class', this.tagMap)
            this.addListToDictionary(this.gradeOptions, 'Grade', this.tagMap)
        },
        /**
         * Populates dictionary with each entity in list, adding a type field to each entity.
         * Assumes that a property list[i].value is set for all entities in list[i].
         * Uses list[i].value as the entity's dictionary key.
         * @param list
         * @param type
         * @param dictionary
         */
        addListToDictionary(list, type, dictionary) {
            for (let i = 0; i < list.length; i++) {
                const entity = list[i]
                dictionary[String(entity.value).toLowerCase()] = { ...entity, type }
            }
        },
        /**
         * Executes the search request and sets this.heroSearchResults to the results.
         * @returns {Promise<>}
         */
        search() {
            return heroSearchService.search(this.heroSearchForm).then((results) => {
                this.heroSearchResults = results
            })
        },
        classDropdownChanged(selections) {
            console.log('classDropdownChanged', selections)
            this.search()
        },
        elementDropdownChanged(selections) {
            console.log('elementDropdownChanged', selections)
            this.search()
        },
        gradeDropdownChanged(selections) {
            console.log('gradeDropdownChanged', selections)
            this.search()
        },
        tagsSrOutput(tags) {
            const srOutputValues = tags.map((v) => v.text)
            return `"${srOutputValues.join(',')}"`
        },
        tagSymbol(tag) {
            if (tag && tag.symbol) {
                return this.renderSymbol(tag.symbol)
            }
            return ''
        },
        renderSymbol(symbol) {
            return require(`@/assets/${symbol}`)
        },
        retrieveContextualFormList(type, form) {
            if (type && form) {
                let contextualFormList = null
                switch (type.toLowerCase()) {
                    case 'element':
                        contextualFormList = form.elements
                        break
                    case 'class':
                        contextualFormList = form.classes
                        break
                    case 'grade':
                        contextualFormList = form.grades
                        break
                }
                return contextualFormList
            }
        },
        addTagToForm(tag, form) {
            if (tag && tag.type && form) {
                const contextualFormList = this.retrieveContextualFormList(tag.type, form)
                contextualFormList.push(tag.value)
            }
        },
        removeTagFromForm(tag, form) {
            if (tag && tag.type && form) {
                const contextualFormList = this.retrieveContextualFormList(tag.type, form)
                contextualFormList.splice(contextualFormList.indexOf(tag.value), 1)
            }
        },
        enterTag() {
            // Verify if tag is allowed and if so, add it
            const tag = this.tagMap[String(this.text).toLowerCase()]
            if (tag) {
                this.addTagToForm(tag, this.heroSearchForm)
                this.tags.push(tag)
                this.text = ''
                this.search()
            }
        },
        backspaceTag() {
            if (this.text === '') {
                // If the input section is empty, remove the last tag in the list
                const tagBeingRemoved = this.tags.pop()
                this.deleteTag(tagBeingRemoved)
            }
        },
        tagDeleteButton(i) {
            const tagBeingDeleted = this.tags.splice(i, 1)[0]
            this.deleteTag(tagBeingDeleted)
        },
        deleteTag(tag) {
            this.removeTagFromForm(tag, this.heroSearchForm)
            this.tagRemoved = '(Tag removed) ' + tag.text
            this.search() // Might want to let the parent call this, unsure yet
        },
        /* Function is emitted when a table row is clicked */
        loadDetailed(e) {
            // prints out row's character ID
            console.log(e.ID)
            // Runs sidebarToggle function to adjust for detailed view
            this.sidebarToggle()
        },
        // Changes the margin of the main content to make room for side drawer content
        sidebarToggle() {
            // Returns to normal position
            // TODO instead of using document object to change styles, use vue with dynamic classes.
            // TODO Also do not use the document style state as a conditional
            if (document.getElementById('searchContent').style.marginRight == '50vw') {
                document.getElementById('searchContent').style.transitionDuration = '0.35s'
                document.getElementById('searchContent').style.marginRight = ''
            }
            // Moves Left
            else {
                document.getElementById('searchContent').style.transitionDuration = '0.35s'
                document.getElementById('searchContent').style.marginRight = '50vw'
            }
        }
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
    color: #f1f1f1;
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
.table {
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
.navDrawer {
    width: 50vw;
}

/* Mobile only specifications */
@media only screen and (max-width: 600px) {
    .navDrawer {
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
