import axios, { AxiosError } from 'axios'
import { logError } from '../utils/logger'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api/v1/',
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    logError('API request failed', error, {
      scope: 'api',
      meta: { status, url: error.config?.url },
    })
    return Promise.reject(error)
  }
)

export default api
