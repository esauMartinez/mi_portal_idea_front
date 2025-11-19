import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraUbicacion {
  id: number
  evento: string
  fecha: Date
  ubicacionId: number
  empleadoId: number
  empleado: IEmpleado
}
