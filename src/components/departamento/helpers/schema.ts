import * as yup from 'yup'

export const schema = yup.object({
  nombre: yup.string().required('EL campo es requerido.'),
  codigo: yup.string().required('EL campo es requerido.'),
  activo: yup.boolean().default(true).required('EL campo es requerido.'),
})
