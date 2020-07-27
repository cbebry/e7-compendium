<template>
    <div class="search-filter-grades">
        <b-form-group label="Grade(s)">
            <b-form-checkbox-group buttons v-model="selectedGrades">
                <b-form-checkbox
                    v-for="gradeOption in gradeOptions"
                    :key="gradeOption.value"
                    :value="gradeOption.value"
                    @change.native="selectGrade"
                >
                    <!-- change display value here -->
                    {{ gradeOption.text }}
                </b-form-checkbox>
            </b-form-checkbox-group>
        </b-form-group>
    </div>
</template>

<script>
export default {
    name: 'search-filter-grades',
    props: ['value'],
    data() {
        return {
            selectedGrades: [],
            gradeOptions: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '5', value: '5' }
            ]
        }
    },
    methods: {
        selectGrade() {
            this.$emit('gradeSelection', this.selectedGrades)
        }
    },
    watch: {
        value() {
            this.selectedGrades = this.value
        }
    }
}
</script>

<style lang="less">
.search-filter-grades label {
    padding: 5px 8px;
    user-select: none;
    min-width: 18px;
    text-align: center;
    background: #2a313d;
    color: #a1aebd;
    border: 1px solid #222731;
    border-radius: 3px;
    box-shadow: none !important;
    outline: 0;
}

.search-filter-grades label.hover {
    background: #252b35;
}

.search-filter-grades label.active {
    background: #202225;
}
</style>
