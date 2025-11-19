import * as yup from 'yup'

export const schema = yup.object({
  nombre: yup.string().required('El campo es requerido'),
  clave: yup.string().required('El campo es requerido'),
  activo: yup.boolean().default(true).required('El campo es requerido'),
})
