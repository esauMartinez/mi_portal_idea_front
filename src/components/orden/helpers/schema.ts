import * as yup from 'yup'

export const schema = yup.object({
  referencia: yup.string().required('El campo es requerido.'),
  referenciaSap: yup.string().required('El campo es requerido.'),
  monto: yup.string().required('El campo es requerido.'),
  empresaId: yup.number().required('Debes seleccionar una empresa valida.'),
  sucursalId: yup.number().required('El campo es requerido.'),
  solicitanteId: yup.number().required('El campo es requerido.'),
})
