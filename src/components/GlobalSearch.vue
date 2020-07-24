<template>
    <div class="global-search">
        <b-form inline>
            <div class="global-search--form-wrap">
                <label class="sr-only" for="inline-form-input-name">Search Term</label>
                <b-input
                    class="global-search--search-term"
                    placeholder="Search Term"
                ></b-input>
                <b-button variant="primary">Search</b-button>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'GlobalSearch',
    components: { }
}
</script>

<style scoped lang="less">
    .global-search {
      margin-left: 10vw;
      margin-right: 10vw;
    }
    .global-search--search-term {
      width: 100%;
      max-width: 500px;
    }
    .global-search--form-wrap {
      width: 100%;
    }
</style>
