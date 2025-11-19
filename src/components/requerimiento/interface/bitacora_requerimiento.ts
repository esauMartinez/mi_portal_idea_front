import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraRequerimiento {
  id: number
  evento: string
  fecha: Date
  requerimientoId: number
  empleadoId: number
  empleado: IEmpleado
}
