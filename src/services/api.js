import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '3221682aee057a252318ce11b3bf1533',
    language: 'pt-BR',
    page: 1
  }
})

export default api
