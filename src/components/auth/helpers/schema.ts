import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().default('').required('El usuario es requerido.'),
  password: yup.string().default('').required('La contraseña es requerida.'),
})
