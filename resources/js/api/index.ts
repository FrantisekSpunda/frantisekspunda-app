import axios from 'axios'
import config from 'config'

export const api = axios.create({
  baseURL: config.api.url,
  headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
  },
  withCredentials: true,
})
