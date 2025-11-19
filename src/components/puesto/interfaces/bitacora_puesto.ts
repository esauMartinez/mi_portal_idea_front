import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraPuesto {
  id: number
  evento: string
  fecha: Date
  puestoId: number
  empleadoId: number
  empleado: IEmpleado
}
