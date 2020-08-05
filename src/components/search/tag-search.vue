<template>
  <div class="tagsearch">
    <!-- Issue where pressing enter allows user to input tags in order
         Issue is corelated to ":add-only-from-autocomplete="true" set to false for testing -->
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      :add-only-from-autocomplete="true"
      :autocomplete-filter-duplicates="true"
      :autocomplete-min-length=2
      @tags-changed="update"
      @input.native="filterUpdate"
      @keyup.native.enter="filterUpdate"
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
        // Elements
        { text: 'Fire',}, { text: 'Ice',}, { text: 'Earth',}, { text: 'Light',}, { text: 'Dark',},
        { text: 'Defense Break',}, { text: 'Attack Up',},
      ],
      debounce: null,
    };
  },
  methods: {
    update(newTags) {
      this.tags = newTags;
    },
    filterUpdate() {
      var tempTags = JSON.parse(JSON.stringify(this.tags));
      tempTags.unshift(this.tag);
      this.$emit('filterUpdate', tempTags);
    }
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

<style lang="less">
.tagsearch {
  margin: auto;
}
.tagsearch input{
  background: #222731;
  color: #f1f1f1;
}

.vue-tags-input {
  background: #222731;
  border-radius: 10px;
  border: 0;
  width: 30vw;
  min-width: 300px;
}
.vue-tags-input .ti-input {
  background: #222731;
  color: #f1f1f1;
  border-radius: 5px;
  border: 0;
  padding: 4px 10px;
  transition: border-bottom 200ms ease;
}
.vue-tags-input .ti-tags{
  background: #222731;
  color: #f1f1f1;
}

.vue-tags-input .ti-tag {
  position: relative;
  background: #4A4344;
  color: #f1f1f1;
}
.vue-tags-input .ti-autocomplete {
  background: #2C2F33;
  border-radius: 10px;
  border: 2px solid #222731;
  border-top: none;
}
.vue-tags-input .ti-item.ti-selected-item {
  background: #23272A;
}
.vue-tags-input .ti-item {
  background: #2C2F33;
}
.vue-tags-input .ti-item :hover {
  background: #23272A;
}
</style>
