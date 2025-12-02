import * as yup from 'yup'

export const schema = yup.object({
  // clases: yup.number().default(1),
  tieneOrden: yup.boolean().default(false),
  fechaInicio: yup.date().typeError('Debes ingrasar una fecha').required('El campo es requerido'),
  horaInicio: yup.date().typeError('Debes ingrasar una fecha').required('El campo es requerido'),
  fechaFinalizacion: yup
    .date()
    .typeError('Debes ingrasar una fecha')
    .required('El campo es requerido'),
  horaFinalizacion: yup.date().required('El campo es requerido'),
  duracion: yup.string().required('El campo es requerido'),
  tipo: yup.string().required('El campo es requerido'),
  cursoId: yup.number().required('El campo es requerido'),
  modeloId: yup.number().nullable(),
  ubicacionId: yup.number().nullable().required('El campo es requerido'),
  sala: yup.string().nullable().required('El campo es requerido'),
  // instructores: yup
  //   .array<IEmpleado[]>()
  //   .min(1, 'Debes ingresar al menos un instructor')
  //   .required('Debes ingresar al menos un instructor'),
  // alumnos: yup.array<IEmpleado[]>(),
  representanteEmpresaId: yup.number().nullable().required('El campo es requerido'),
  representanteEmpleadosId: yup.number().nullable().required('El campo es requerido'),
  ocupacionId: yup.number().required('El campo es requerido'),
  areaTematicaId: yup.number().required('El campo es requerido'),
  estatus: yup.string(),
  minimoAlumnos: yup
    .number()
    .default(10)
    .typeError('Debes ingresar solo numeros')
    .min(1)
    .typeError('El numero de alumnos debe de ser por lo menos 1')
    .required('El campo es requerido'),
  maximoAlumnos: yup
    .number()
    .default(15)
    .typeError('Debes ingresar solo numeros')
    .min(1)
    .max(100)
    .required('El campo es requerido'),
})
