import * as yup from 'yup'

export const schema = yup.object({
  razonSocial: yup.string().required('Campo requerido.'),
  rfc: yup.string().required('Campo requerido.'),
  activo: yup.boolean().default(true).required('EL campo es requerido.'),
})
