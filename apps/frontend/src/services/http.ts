import axios from 'axios'

export const countriesApi = axios.create({
  baseURL: 'http://localhost:3333',
})
