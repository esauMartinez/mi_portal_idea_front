import * as yup from 'yup'
import type { IOcuapacionEmpleado } from '../interfaces/ocupacionesEmpleado'

const baseSchema = {
  idUsuario: yup
    .number()
    .typeError('Debes ingresar solo numeros')
    .nullable()
    .required('El campo es requerido.'),
  primerNombre: yup.string().nullable().required('El campo es requerido.'),
  segundoNombre: yup.string().nullable(),
  apellidoPaterno: yup.string().nullable().required('El campo es requerido.'),
  apellidoMaterno: yup.string().nullable(),
  fechaNacimiento: yup.date().nullable().required('El campo es requerido.'),
  rfc: yup.string().nullable().required('El campo es requerido.'),
  curp: yup.string().nullable().required('El campo es requerido.'),
  activo: yup.boolean().nullable().default(true).required('El campo es requerido.'),
  email: yup
    .string()
    .email('Ingresa un email valido')
    .nullable()
    .required('El campo es requerido.'),
  tieneUsuario: yup.boolean().nullable().default(false).required('El campo es requerido.'),
  password: yup.string().nullable(),
  verificarPassword: yup.string().nullable(),
  verificado: yup.boolean().nullable().default(false).required('El campo es requerido.'),
  tipo: yup
    .string()
    .oneOf(['interno', 'externo'])
    .nullable()
    .default('interno')
    .required('El campo es requerido.'),
  instructor: yup.boolean().nullable().default(false).required('El campo es requerido.'),
  cargoId: yup
    .number()
    .nullable()
    .when('tipo', (tipo, schema) => {
      if (tipo[0] === 'interno') {
        return schema.required('El campo es requerido')
      }
      return schema.notRequired()
    }),
  puestoId: yup
    .number()
    .nullable()
    .when('tipo', (tipo, schema) => {
      if (tipo[0] === 'interno') {
        return schema.required('El campo es requerido')
      }
      return schema.notRequired()
    }),
  departamentoId: yup
    .number()
    .nullable()
    .when('tipo', (tipo, schema) => {
      if (tipo[0] === 'interno') {
        return schema.required('El campo es requerido')
      }
      return schema.notRequired()
    }),
  empresaId: yup.number().nullable().required('El campo es requerido'),
  sucursalId: yup
    .number()
    .nullable()
    .when('tipo', (tipo, schema) => {
      if (tipo[0] === 'interno') {
        return schema.required('El campo es requerido')
      }
      return schema.notRequired()
    }),
  perfilId: yup
    .number()
    .nullable()
    .when('tieneUsuario', (tieneUsuario, schema) => {
      if (tieneUsuario[0] === true) {
        return schema.required('El campo es requerido')
      }
      return schema.notRequired()
    }),
  centroCostoId: yup
    .number()
    .nullable()
    .when('tipo', (tipo, schema) => {
      if (tipo[0] === 'interno') {
        return schema.required('El campo es requerido')
      }
      return schema.notRequired()
    }),
  ocupacionesEmpleado: yup
    .array<IOcuapacionEmpleado[]>()
    .min(1, 'Debe tener al menos una ocupación')
    .required('El campo es requerido'),
}

// Schema para crear empleado (contraseñas obligatorias)
export const crearSchema = yup.object({
  ...baseSchema,
  password: yup
    .string()
    .nullable()
    .when('tieneUsuario', (tieneUsuario, schema) => {
      if (tieneUsuario[0] === true) {
        return schema.required('El campo es requerido')
      }
      return schema.notRequired()
    }),
  verificarPassword: yup
    .string()
    .nullable()
    .when('tieneUsuario', (tieneUsuario, schema) => {
      if (tieneUsuario[0] === true) {
        return schema
          .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
          .required('El campo es requerido')
      }
      return schema.notRequired()
    }),
})

// Schema para editar empleado (contraseñas opcionales)
export const modificarSchema = yup.object({
  ...baseSchema,
  password: yup.string().nullable(),
  verificarPassword: yup.string().nullable(),
})

// Función para obtener el schema apropiado
export const getSchema = (isEditing: boolean) => {
  return isEditing ? modificarSchema : crearSchema
}

// Schema por defecto (mantener compatibilidad)
export const schema = crearSchema
