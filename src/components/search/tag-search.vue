<template>
  <div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      :add-only-from-autocomplete="true"
      :autocomplete-filter-duplicates="true"
      :autocomplete-min-length=2
      @tags-changed="newTags => tags = newTags"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [
        { text: 'Fire',},
        { text: 'Ice',},
        { text: 'Earth',},
        { text: 'Light',},
        { text: 'Dark',},
        { text: 'Defense Break',},
      ],
    };
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
};

</script>
