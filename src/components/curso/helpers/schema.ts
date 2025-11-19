import * as yup from 'yup'
import type { IRequerimientoCurso } from '../interfaces/requerimiento_curso'

export const schema = yup.object({
  nombre: yup.string().required('El campo es requerido'),
  estatus: yup.boolean().default(true).required('El campo es requerido'),
  requerimientosCursos: yup
    .array<IRequerimientoCurso[]>()
    .min(1, 'Debe tener al menos una ocupación')
    .required('El campo es requerido'),
})
