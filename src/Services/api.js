import axios from 'axios'

const api = axios.create({
    baseURL : 'https://backfrotas.onrender.com'
})

export default api