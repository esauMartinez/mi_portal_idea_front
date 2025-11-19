import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IClaseInstructor {
  id?: number
  claseId: number
  empleadoId: number
  empleado?: IEmpleado
}
