import * as yup from 'yup'

export const schema = yup.object({
  referenciaSap: yup.string().required('El campo es requerido.'),
  monto: yup.string().required('El campo es requerido.'),
  empresaId: yup.number().required('Debes seleccionar una empresa valida.'),
  sucursalId: yup.number().required('El campo es requerido.'),
  solicitanteId: yup.number().required('El campo es requerido.'),
  estatus: yup.string().oneOf(['Creada', 'Liberada', 'Cerrada']),
  referencia: yup
    .string()
    .nullable()
    .when('estatus', {
      is: (val: string) => val === 'Creada',
      then: (schema) => schema.required('El campo es requerido'),
      otherwise: (schema) => schema.notRequired(),
    }),
  file: yup.mixed<File>().when('estatus', {
    is: (val: string) => val === 'Creada',
    then: (schema) =>
      schema
        .required('El campo es requerido')
        .test('fileSize', 'El archivo es demasiado grande', (value) => {
          if (!value) return false
          return value.size <= 2_000_000
        })
        .test('fileType', 'Formato no permitido', (value) => {
          if (!value) return false
          return value.type === 'application/pdf'
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
})
