import axios from 'axios'

export const backendRoot = axios.create({
  baseURL: 'https://katrade-backend.herokuapp.com',
  headers: { 'Content-Type': 'application/json' },
})
