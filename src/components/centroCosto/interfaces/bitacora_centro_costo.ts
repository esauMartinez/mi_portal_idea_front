import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraCentroCosto {
  id: number
  evento: string
  fecha: Date
  centroCostoId: number
  empleadoId: number
  empleado: IEmpleado
}
