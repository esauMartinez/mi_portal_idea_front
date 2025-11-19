import * as yup from 'yup'

export const schema = yup.object({
  codigo: yup.string().required('El campo es requerido'),
  nombre: yup.string().required('El campo es requerido'),
  activo: yup.boolean().default(true).required('El campo es requerido'),
})
