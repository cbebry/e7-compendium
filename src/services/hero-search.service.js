import axios from 'axios'

export default {
    search({ name, elements, classes, grades }) {
        return axios.get('/hero-data.json').then((response) => {
            console.log(`loaded ${response.data.length} entries from base.json`)
            const filteredData = response.data.filter((entry) => {
                const queryMatchesName = entry.Name.toLowerCase().indexOf(name.toLowerCase()) > -1
                const queryMatchesElements =
                    elements.length === 0 || elements.indexOf(entry.Element.toLowerCase()) > -1
                const queryMatchesClasses =
                    classes.length === 0 || classes.indexOf(entry.Class.toLowerCase()) > -1
                const queryMatchesGrades =
                    grades.length === 0 || grades.indexOf(entry.Grade.toLowerCase()) > -1

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
        })
    }
}
