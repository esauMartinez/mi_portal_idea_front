import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().default('martinez117esau@gmail.com').required('El usuario es requerido.'),
  password: yup.string().default('esau').required('La contraseña es requerida.'),
})
