import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraCargo {
  id: number
  evento: string
  fecha: Date
  cargoId: number
  empleadoId: number
  empleado: IEmpleado
}
