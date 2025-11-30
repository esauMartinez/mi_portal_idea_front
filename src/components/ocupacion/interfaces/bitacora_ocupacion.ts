import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraOcupacion {
  id: number
  evento: string
  fecha: Date
  ocupacionId: number
  empleadoId: number
  empleado: IEmpleado
}
