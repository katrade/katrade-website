import axios from 'axios'

export const backendRoot = axios.create({
  baseURL: 'https://katrade-backend.herokuapp.com',
  // baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
})
