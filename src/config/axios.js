import axios from 'axios'

export default axios.create(
    {
        baseURL: 'https://konvergen-api.herokuapp.com'
    }
)