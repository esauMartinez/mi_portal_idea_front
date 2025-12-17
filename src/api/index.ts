import axios from 'axios'
import Swal from 'sweetalert2'

export const apiUrl = import.meta.env.VITE_API_URL

export const api_mi_portal = axios.create({
  baseURL: apiUrl,
})

api_mi_portal.interceptors.request.use(
  (config) => {
    const data = JSON.parse(localStorage.getItem('empleado')!)

    if (data?.token) {
      config.headers.Authorization = `Bearer ${data.token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

api_mi_portal.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error)
    if (error.response.status === 403) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: error.response.data.mensaje,
      })
    } else {
      return Promise.reject(error)
    }
  },
)
