import axios from 'axios'

export default {
    search({ name, elements, roles, grades }) {
        return axios.get('/base.json').then((response) => {
            console.log(`loaded ${response.data.length} entries from base.json`)
            const filteredData = response.data.filter((entry) => {
                const queryMatchesName = entry.Name.toLowerCase().indexOf(name.toLowerCase()) > -1
                const queryMatchesElements = elements.length === 0 || elements.indexOf(entry.Element.toLowerCase()) > -1
                const queryMatchesRoles = roles.length === 0 || roles.indexOf(entry.Class.toLowerCase()) > -1
                const queryMatchesGrades = grades.length === 0 || grades.indexOf(entry.Grade.toLowerCase()) > -1

                return queryMatchesName && queryMatchesElements && queryMatchesRoles && queryMatchesGrades
            })
            console.log(
                `query for {${name} ${elements} ${roles} ${grades}} has ${filteredData.length} results after filters applied`
            )
            return filteredData
        })
    }
}
