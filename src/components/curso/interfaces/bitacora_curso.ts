import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraCurso {
  id: number
  evento: string
  fecha: Date
  cursoId: number
  empleadoId: number
  empleado: IEmpleado
}
