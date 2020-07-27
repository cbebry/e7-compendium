<template>
    <div class="mechanics">
        <div class="container grid-side-500">
            <b-tabs pills card vertical class="tabs">
                <b-tab title="Tab 1" active>
                    <div class="tablist">
                        <b-card no-body class="accordion-tab">
                            <b-card-header header-tag="header" class="accordion-button" role="tab">
                                <b-button block v-b-toggle.accordion-1 variant="dark">
                                    Mechanic 1
                                </b-button>
                            </b-card-header>
                            <b-collapse
                                id="accordion-1"
                                visible
                                accordion="my-accordion"
                                class="tabpanel"
                            >
                                <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="accordion-tab">
                            <b-card-header header-tag="header" class="accordion-button" role="tab">
                                <b-button block v-b-toggle.accordion-2 variant="dark">
                                    Mechanic 2
                                </b-button>
                            </b-card-header>
                            <b-collapse id="accordion-2" accordion="my-accordion" class="tabpanel">
                                <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="accordion-tab">
                            <b-card-header header-tag="header" class="accordion-button" role="tab">
                                <b-button block v-b-toggle.accordion-3 variant="dark">
                                    Mechanic 3
                                </b-button>
                            </b-card-header>
                            <b-collapse id="accordion-3" accordion="my-accordion" class="tabpanel">
                                <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="accordion-tab">
                            <b-card-header header-tag="header" class="accordion-button" role="tab">
                                <b-button block v-b-toggle.accordion-3 variant="dark">
                                    Mechanic 4
                                </b-button>
                            </b-card-header>
                            <b-collapse id="accordion-3" accordion="my-accordion" class="tabpanel">
                                <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="accordion-tab">
                            <b-card-header header-tag="header" class="accordion-button" role="tab">
                                <b-button block v-b-toggle.accordion-3 variant="dark">
                                    Mechanic 5
                                </b-button>
                            </b-card-header>
                            <b-collapse id="accordion-3" accordion="my-accordion" class="tabpanel">
                                <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="accordion-tab">
                            <b-card-header header-tag="header" class="accordion-button" role="tab">
                                <b-button block v-b-toggle.accordion-3 variant="dark">
                                    Mechanic 6
                                </b-button>
                            </b-card-header>
                            <b-collapse id="accordion-3" accordion="my-accordion" class="tabpanel">
                                <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="accordion-tab">
                            <b-card-header header-tag="header" class="accordion-button" role="tab">
                                <b-button block v-b-toggle.accordion-3 variant="dark">
                                    Mechanic 7
                                </b-button>
                            </b-card-header>
                            <b-collapse id="accordion-3" accordion="my-accordion" class="tabpanel">
                                <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        <b-card no-body class="accordion-tab">
                            <b-card-header header-tag="header" class="accordion-button" role="tab">
                                <b-button block v-b-toggle.accordion-3 variant="dark">
                                    Mechanic 8
                                </b-button>
                            </b-card-header>
                            <b-collapse id="accordion-3" accordion="my-accordion" class="tabpanel">
                                <b-card-body>
                                    <b-card-text>{{ text }}</b-card-text>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                    </div>
                </b-tab>
                <b-tab title="Tab 2"><b-card-text></b-card-text></b-tab>
                <b-tab title="Tab 3"><b-card-text></b-card-text></b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mechanics',
    components: {},

    data() {
        return {
            text: `
          Mechanics Text.
        `
        }
    }
}
</script>

<style scoped lang="less">
@import '~../less/variables.less';

.mechanics {
    margin-top: 3vh;
    background: #252b35;
}

.tabs {
    background: #252b35;
    height: 90vh;
}

.tabpanel {
    background: #252b35;
    text-align: left;
}

.accordion-tab {
    background: #252b35;
}
</style>
