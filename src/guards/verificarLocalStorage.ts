import { api_mi_portal } from '@/api'

export const verificarLocalStorage = async () => {
  const { data, token } = JSON.parse(localStorage.getItem('empleado')!)
  if (data !== null && data !== undefined) {
    api_mi_portal.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}
