import axios from 'axios'

export default {
    /**
     * Represents a stub of backend logic for filtering,
     * whereas when a backend is implemented this function would simply call the backend querying API.
     * @param heroData
     * @param name
     * @param elements
     * @param classes
     * @param grades
     * @returns {*}
     */
    search(heroData, { name, elements, classes, grades }) {
        console.log(`loaded ${heroData.length} entries from hero database`)
        const filteredData = heroData.filter((entry) => {
            const queryMatchesName = entry.name.toLowerCase().indexOf(name.toLowerCase()) > -1
            const queryMatchesElements =
                elements.length === 0 || elements.indexOf(entry.element.toLowerCase()) > -1
            const queryMatchesClasses =
                classes.length === 0 || classes.indexOf(entry.class.toLowerCase()) > -1
            const queryMatchesGrades =
                grades.length === 0 || grades.indexOf(entry.grade.toLowerCase()) > -1

            return (
                queryMatchesName &&
                queryMatchesElements &&
                queryMatchesClasses &&
                queryMatchesGrades
            )
        })
        console.log(
            `query for {${name} ${elements} ${classes} ${grades}} has ${filteredData.length} results after filters applied`
        )
        return filteredData
    },
    /**
     * Represents a stub of backend code which obtains the entire hero resultset.
     * When we have a backend, this function will be replaced by direct queries.
     * @returns {Promise<>}
     */
    queryAll() {
        return axios.get('/hero-data.json').then(({ data }) => {
            return data
        })
    }
}
