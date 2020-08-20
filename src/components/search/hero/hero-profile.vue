<template>
    <b-container fluid class="detailed-content">
        <h1>Detail for {{ heroProfile.Name }}</h1>
        <div>
            {{ heroProfile }}
        </div>
        <div class="container grid-side-500">
            <b-row>
                <b-col>
                    <h1>HERO_IMG</h1>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col><p>Element_IMG</p></b-col>
                        <b-col><p>Element_title</p></b-col>
                        <b-col><p>Grade_IMG</p></b-col>
                        <b-col><p>Grade_title</p></b-col>
                    </b-row>
                    <b-row>
                        <b-col><p>Class_IMG</p></b-col>
                        <b-col><p>Class_title</p></b-col>
                        <b-col><p>Zodiac_IMG</p></b-col>
                        <b-col><p>Zodiac_title</p></b-col>
                    </b-row>
                    <b-row>
                        <b-col><p>Attack</p></b-col>
                        <b-col>
                            <!-- <b-progress :value="tempVal" class="w-50 mb-2"></b-progress>-->
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col><p>Health</p></b-col>
                        <b-col>
                            <!-- <b-progress :value="tempVal" class="w-50 mb-2"></b-progress>-->
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col><p>Defense</p></b-col>
                        <b-col>
                            <!-- <b-progress :value="tempVal" class="w-50 mb-2"></b-progress>-->
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col><p>Speed</p></b-col>
                        <b-col>
                            <!-- <b-progress :value="tempVal" class="w-50 mb-2"></b-progress>-->
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-row>
                                <b-col><p>Crit%</p></b-col>
                            </b-row>
                            <b-row>
                                <b-col><p>CritDmg</p></b-col>
                            </b-row>
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col><p>Eff</p></b-col>
                            </b-row>
                            <b-row>
                                <b-col><p>EffResist</p></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-row><p>Hero Description</p></b-row>
                    <b-row>
                        <b-col>
                            SPECIALTY_IMG
                        </b-col>
                        <b-col>
                            Specialty description
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    <p>Imprint info</p>
                </b-col>
                <b-col>
                    <p>Imprint focus info</p>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-card
                            title="Card Title"
                            tag="article"
                            style="width: 15vw;"
                            class="mb-2"
                    >
                        <b-card-text>
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card
                            title="Card Title"
                            tag="article"
                            style="width: 15vw;"
                            class="mb-2"
                    >
                        <b-card-text>
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </b-col>
                <b-col>
                    <b-card
                            title="Card Title"
                            tag="article"
                            style="width: 15vw;"
                            class="mb-2"
                    >
                        <b-card-text>
                            Some quick example text to build on the card title and make
                            up the bulk of the card's content.
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'hero-profile',
    props: ['heroId'],
    computed: {
        ...mapGetters('hero', ['getHeroProfile']),
        heroProfile() {
            return this.getHeroProfile(this.heroId)
        }
    }
}
</script>

<style scoped lang="less"></style>
