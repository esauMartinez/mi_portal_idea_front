import type { IRequerimiento } from '@/components/requerimiento/interface/requerimineto'
import type { ICurso } from './curso'

export interface IRequerimientoCurso {
  id?: number
  cursoId: number
  curso?: ICurso
  requerimientoId: number
  requerimiento?: IRequerimiento
}
