import * as yup from 'yup'

export const schema = yup.object({
  nombre: yup.string().required('El campo es requerido.'),
})
