import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraModelo {
  id: number
  evento: string
  fecha: Date
  modeloId: number
  empleadoId: number
  empleado: IEmpleado
}
