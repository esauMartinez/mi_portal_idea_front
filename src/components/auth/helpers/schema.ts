import * as yup from 'yup'

export const schema = yup.object({
  email: yup.string().email('Ingresa un email valido').required('El usuario es requerido.'),
  password: yup.string().default('').required('La contraseña es requerida.'),
})

export const schemaOlvidada = yup.object({
  email: yup
    .string()
    .email('Ingresa un email valido')
    .nullable()
    .required('El campo es requerido.'),
})

export const schemaRecuperar = yup.object({
  password: yup.string().nullable().required('El campo es requerido.'),
  verificarPassword: yup.string().nullable().required('El campo es requerido.'),
})
