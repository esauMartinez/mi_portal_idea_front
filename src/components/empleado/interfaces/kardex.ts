import type { IRequerimiento } from '@/components/requerimiento/interface/requerimineto'

export interface IKardex {
  id?: number
  empleadoId: number
  requerimientoId: number
  requerimiento?: IRequerimiento
}
