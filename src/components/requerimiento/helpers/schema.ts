import * as yup from 'yup'

export const schema = yup.object({
  clave: yup.string().required('El campo es requerido.'),
  nombre: yup.string().required('El campo es requerido.'),
  estatus: yup.boolean().default(true).required('El campo es requerido.'),
})
