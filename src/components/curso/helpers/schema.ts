import * as yup from 'yup'
import type { IRequerimientoCurso } from '../interfaces/requerimiento_curso'

export const schema = yup.object({
  tipo: yup
    .string()
    .oneOf(['interno', 'externo'])
    .nullable()
    .default('interno')
    .required('El campo es requerido.'),
  nombre: yup.string().required('El campo es requerido'),
  estatus: yup.boolean().default(true).required('El campo es requerido'),
  requerimientosCursos: yup.array<IRequerimientoCurso[]>().when('tipo', (tipo, schema) => {
    if (tipo[0] === 'interno') {
      return schema.min(1, 'Debe tener al menos una ocupación').required('El campo es requerido')
    }
    return schema.notRequired()
  }),
})
