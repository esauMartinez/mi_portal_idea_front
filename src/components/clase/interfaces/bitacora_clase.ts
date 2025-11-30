import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraClase {
  id: number
  evento: string
  fecha: Date
  claseId: number
  empleadoId: number
  empleado: IEmpleado
}
