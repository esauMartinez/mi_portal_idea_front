import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraSucursal {
  id: number
  evento: string
  fecha: Date
  sucursalId: number
  empleadoId: number
  empleado: IEmpleado
}
