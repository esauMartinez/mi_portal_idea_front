import router from '@/router'
import axios from 'axios'
import Swal from 'sweetalert2'

// const dominio = 'mi-portal-idea-560bb088c8b9.herokuapp.com'
const dominio = 'localhost:2300'

export const baseURL = `http://${dominio}/`

export const api_mi_portal = axios.create({
  baseURL,
})

api_mi_portal.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      Swal.fire({
        title: 'Sesion',
        text: 'Tu sesion ha expirado',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Acceptar',
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('empleado')
          router.push('/')
        }
      })
    } else if (error.response.status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.mensaje,
      })
    } else {
      return Promise.reject(error)
    }
  },
)
