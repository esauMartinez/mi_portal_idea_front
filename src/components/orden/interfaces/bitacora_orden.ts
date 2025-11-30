import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraOrden {
  id: number
  evento: string
  fecha: Date
  ordenId: number
  empleadoId: number
  empleado: IEmpleado
}
