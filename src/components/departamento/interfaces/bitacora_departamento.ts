import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraDepartamento {
  id: number
  evento: string
  fecha: Date
  departamentoId: number
  empleadoId: number
  empleado: IEmpleado
}
