<template>
    <div class="home">
        <!-- ### Move background imace sourcing to local files ### -->

        <div class="bg active" style="background-image: url('/assets/background.png');"></div>
        <div class="justify-content-center">
            <global-search class="search-bar"></global-search>
        </div>
        <div class="home-text d-flex justify-content-center">
            <div class="text-left">
                <p>
                    Epic7Compendium aims to be the one shop shop for heirs looking for information
                    on Epic Seven.
                </p>
                <strong>Current Features</strong>
                <ul>
                    <li>Hero Information</li>
                    <li>Artifact Information</li>
                    <li>Mechanics Details</li>
                    <li>Guides</li>
                </ul>
                <strong>Planned Additions</strong>
                <ul>
                    <li>Morale Calculator</li>
                    <li>Damage Calculator</li>
                    <li>Language Support</li>
                </ul>
                <p><i>Changelog: added basic functions</i></p>
                <small>
                    <p>
                        Maintained by @ichinoseKuri (
                        <i>Discord ID: 『Kuri』#0002</i>
                        )
                    </p>
                </small>
            </div>
        </div>
    </div>
</template>

<script>
import GlobalSearch from '@/components/GlobalSearch.vue'

export default {
    name: 'home',
    components: {
        GlobalSearch
    }
}
</script>

<style scoped lang="less">
@import '~../less/variables.less';

.home {
    background: linear-gradient(black, 1vh, @bgcolor);
}
.bg {
    opacity: 0.25;
    height: 50vh;
    min-height: 300px;
    background: #000 no-repeat scroll center center;
    -webkit-box-shadow: inset 0 0 30px #000;
    -moz-box-shadow: inset 0 0 30px #000;
    box-shadow: inset 0 0 30px #000;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    z-index: -1;
}
.search-bar {
    display: block;
    position: relative;
    margin-top: -28vh;
    min-width: 80vw;
}
.home-text {
    position: relative;
    margin-right: 15vw;
    margin-top: 27vh;
}
</style>
