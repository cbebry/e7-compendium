<template>
    <div class="search">
        <b-row>
            <!-- Main search column -->
            <b-col id="search-content">
                <b-container fluid class="search-content">
                    <h1>Search</h1>
                    <div class="container grid-side-500">
                        <div class="d-flex justify-content-center">
                            <div>
                                <b-input-group class="search-form">
                                    <b-form-input
                                        v-model="heroSearchForm.name"
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
                            <div
                                role="status"
                                aria-live="polite"
                                aria-atomic="true"
                                class="sr-only"
                            >
                                {{ tagRemoved }}
                            </div>
                            <div v-for="(tag, i) in tags" :key="tag.value" class="d-inline-block">
                                <img
                                    class="img-responsive"
                                    v-if="tag.symbol"
                                    :src="tagSymbol(tag)"
                                    aria-hidden="true"
                                />
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
                                    <template v-slot:cell(Bra)="data">
                                        <p>{{ getAttack(data.item) }}</p>
                                    </template>
                                    <template v-slot:cell(Int)="data">
                                        <p>{{ getHealth(data.item) }}</p>
                                    </template>
                                    <template v-slot:cell(Fai)="data">
                                        <p>{{ getDefense(data.item) }}</p>
                                    </template>
                                    <template v-slot:cell(Des)="data">
                                        <p>{{ getSpeed(data.item) }}</p>
                                    </template>
                                </b-table>
                            </div>
                        </b-row>
                    </div>
                </b-container>
            </b-col>
            <!-- Detailed section -->
            <b-col class="sidebar" :class="sidebarStatus">
                <hero-profile :hero-id="selectedHeroId"></hero-profile>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import HeroProfile from '@/components/search/hero/hero-profile'

export default {
    name: 'search',
    components: { HeroProfile },
    data() {
        return {
            sidebarOpen: false,
            selectedHeroId: null,
            heroSearchForm: {
                name: '',
                elements: [],
                classes: [],
                grades: [],
                imprint: ''
            },
            /* Array of tags - Keeps track of active tags
               Objects added to this array will display as an active tag */
            tags: [],
            /* Table columns
               In order to add columns they must have the corresponding key stored here
               tdClass handles individual CSS formatting
               # Name column is listed separately since if all the columns are set to the same width it normalizes the table spacing again (may remove) */
            fields: [
                { key: 'ID', tdClass: 'IDColumn' },
                { key: 'Face_URL', tdClass: 'tableColumn' },
                { key: 'Name', tdClass: 'NameColumn' },
                { key: 'Element', tdClass: 'tableColumn' },
                { key: 'Class', tdClass: 'tableColumn' },
                { key: 'Grade', tdClass: 'tableColumn' },
                { key: 'Bra', tdClass: 'tableColumn' },
                { key: 'Int', tdClass: 'tableColumn' },
                { key: 'Fai', tdClass: 'tableColumn' },
                { key: 'Des', tdClass: 'tableColumn' }
            ],
            // Allowed dictionary of tag keywords
            tagRemoved: '',
            tagMap: {},

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
        this.loadAllHeroData()
    },
    methods: {
        ...mapActions('hero', ['loadAllHeroData']),
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
        classDropdownChanged(selections) {
            console.log('classDropdownChanged', selections)
        },
        elementDropdownChanged(selections) {
            console.log('elementDropdownChanged', selections)
        },
        gradeDropdownChanged(selections) {
            console.log('gradeDropdownChanged', selections)
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
                let contextualFormList = []
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
            const tag = this.tagMap[String(this.heroSearchForm.name).toLowerCase()]
            if (tag) {
                this.addTagToForm(tag, this.heroSearchForm)
                this.tags.push(tag)
                this.heroSearchForm.name = ''
            }
        },
        backspaceTag() {
            // # ISSUE: b-form-input emits function with delay meaning the form is empty by the time this function
            //          reads the form
            if (this.heroSearchForm.name.length === 0) {
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
        },
        /* Function is emitted when a table row is clicked */
        loadDetailed(e) {
            // prints out row's character ID
            console.log(e.ID)
            this.selectedHeroId = e.ID
            // Runs sidebarToggle function to adjust for detailed view
            this.sidebarToggle()
        },
        /**
         * Changes the margin of the main content to make room for the side drawer content.
         */
        sidebarToggle() {
            this.sidebarOpen = !this.sidebarOpen
            if (!this.sidebarOpen) {
                this.selectedHeroId = null
            }
        },
        getAttack(data) {
            var temp = 0.6 * data.Bra * 11 * 1.375 + 150
            if (data.Class == 'Knight') {
                if (data.Zodiac == 'Leo') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Gemini') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Scorpio') {
                    temp = temp * 1.06
                }
            }
            if (data.Class == 'Warrior') {
                if (data.Zodiac == 'Taurus') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Leo') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Libra') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Scorpio') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp * 1.09
                }
            }
            if (data.Class == 'Ranger') {
                if (data.Zodiac == 'Gemini') {
                    temp = temp * 1.15
                }
                if (data.Zodiac == 'Leo') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Virgo') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Libra') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Scorpio') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Aquarius') {
                    temp = temp * 1.09
                }
            }
            if (data.Class == 'Thief') {
                if (data.Zodiac == 'Aries') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Taurus') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Gemini') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Leo') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Scorpio') {
                    temp = temp * 1.09
                }
            }
            if (data.Class == 'Mage') {
                if (data.Zodiac == 'Aries') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Gemini') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Cancer') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Leo') {
                    temp = temp * 1.15
                }
                if (data.Zodiac == 'Virgo') {
                    temp = temp * 1.09
                }
            }
            if (data.Class == 'Soul Weaver') {
                if (data.Zodiac == 'Libra') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp * 1.15
                }
                if (data.Zodiac == 'Aquarius') {
                    temp = temp * 1.09
                }
            }
            return Math.floor(temp)
        },
        getHealth(data) {
            var temp = (50 + 1.4 * data.Int) * 21 * 1.375 + 420
            if (data.Class == 'Knight') {
                if (data.Zodiac == 'Aries') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Cancer') {
                    temp = temp * 1.15
                }
                if (data.Zodiac == 'Libra') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Scorpio') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Pisces') {
                    temp = temp * 1.06
                }
            }
            if (data.Class == 'Warrior') {
                if (data.Zodiac == 'Aries') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Cancer') {
                    temp = temp * 1.15
                }
                if (data.Zodiac == 'Libra') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Scorpio') {
                    temp = temp * 1.09
                }
            }
            if (data.Class == 'Ranger') {
                if (data.Zodiac == 'Leo') {
                    temp = temp * 1.09
                }
            }
            if (data.Class == 'Thief') {
                if (data.Zodiac == 'Scorpio') {
                    temp = temp * 1.09
                }
            }
            if (data.Class == 'Mage') {
                if (data.Zodiac == 'Aquarius') {
                    temp = temp * 1.06
                }
            }
            if (data.Class == 'Soul Weaver') {
                if (data.Zodiac == 'Gemini') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Cancer') {
                    temp = temp * 1.18
                }
                if (data.Zodiac == 'Virgo') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Aquarius') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Pisces') {
                    temp = temp * 1.09
                }
            }
            return Math.floor(temp)
        },
        getDefense(data) {
            var temp = (30 + 0.3 * data.Fai) * 8.5 * 1.375
            if (data.Class == 'Knight') {
                if (data.Zodiac == 'Cancer') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Capricorn') {
                    temp = temp * 1.12
                }
                if (data.Zodiac == 'Pisces') {
                    temp = temp * 1.09
                }
            }
            if (data.Class == 'Warrior') {
                if (data.Zodiac == 'Aries') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Cancer') {
                    temp = temp * 1.09
                }
                if (data.Zodiac == 'Libra') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Scorpio') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Capricorn') {
                    temp = temp * 1.06
                }
            }
            if (data.Class == 'Soul Weaver') {
                if (data.Zodiac == 'Cancer') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Libra') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Aquarius') {
                    temp = temp * 1.06
                }
                if (data.Zodiac == 'Pisces') {
                    temp = temp * 1.12
                }
            }
            return Math.floor(temp)
        },
        getSpeed(data) {
            var temp = 60 + data.Des / 1.6
            if (data.Class == 'Knight') {
                if (data.Zodiac == 'Aries') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Gemini') {
                    temp = temp + 6
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp + 6
                }
            }
            if (data.Class == 'Warrior') {
                if (data.Zodiac == 'Aries') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Virgo') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp + 4
                }
            }
            if (data.Class == 'Ranger') {
                if (data.Zodiac == 'Virgo') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp + 12
                }
                if (data.Zodiac == 'Capricorn') {
                    temp = temp + 6
                }
                if (data.Zodiac == 'Aquarius') {
                    temp = temp + 4
                }
            }
            if (data.Class == 'Thief') {
                if (data.Zodiac == 'Aries') {
                    temp = temp + 6
                }
                if (data.Zodiac == 'Taurus') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Aquarius') {
                    temp = temp + 6
                }
                if (data.Zodiac == 'Pices') {
                    temp = temp + 4
                }
            }
            if (data.Class == 'Mage') {
                if (data.Zodiac == 'Taurus') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Leo') {
                    temp = temp + 6
                }
                if (data.Zodiac == 'Virgo') {
                    temp = temp + 6
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Pices') {
                    temp = temp + 6
                }
            }
            if (data.Class == 'Soul Weaver') {
                if (data.Zodiac == 'Gemini') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Virgo') {
                    temp = temp + 4
                }
                if (data.Zodiac == 'Sagittarius') {
                    temp = temp + 6
                }
            }
            return Math.floor(temp)
        }
    },
    computed: {
        ...mapGetters('hero', ['search']),
        heroSearchResults() {
            return this.search(this.heroSearchForm)
        },
        sidebarStatus() {
            return {
                'sidebar-open': this.sidebarOpen,
                'sidebar-closed': !this.sidebarOpen
            }
        }
    }
}
</script>

<style>
@import '~../less/variables.less';
.search {
    background: #252b35;
}
.search-content {
    overflow-y: scroll;
    height: 93vh;
}
.sidebar {
    margin-right: -102vw;
    width: 0%;
}
.detailed-content {
    overflow-y: scroll;
    height: 93vh;
}
.sidebar-open {
    transition-duration: 0.35s;
    margin-right: 0vw;
}
.sidebar-closed {
    transition-duration: 0.35s;
    margin-right: -102vw;
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
    width: 25vw;
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
    vertical-align: middle;
    font-size: 14px;
    background-color: #222731;
    border: 1px solid #f1f1f1;
    border-radius: 3px;
    box-shadow: none !important;
    outline: 0;
}
.table {
    vertical-align: middle;
    color: #f1f1f1;
    background-color: #252b35;
    box-shadow: none !important;
    border: 0;
}
.hidden_header {
    display: none;
}
.IDColumn {
    vertical-align: middle;
    width: 30px !important;
    font-size: 8px;
}
.NameColumn {
    text-align: left;
    vertical-align: middle;
    font-size: 16px;
}
.tableColumn {
    vertical-align: middle;
    width: 50px !important;
    font-size: 12px;
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
    .search-form {
        width: 100vw;
    }
}
/* Reserved for side drawer content */
.search-tags-container {
    vertical-align: middle;
    font-size: 12px;
    line-height: 0px;
}
.search-tags-container img {
    vertical-align: middle;
    width: 20px;
    height: 20px;
}
</style>
