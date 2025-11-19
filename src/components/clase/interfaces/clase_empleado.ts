import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import type { IClase } from './clase'

export interface IClaseEmpleado {
  id?: number
  claseId: number
  clase: IClase
  empleadoId: number
  empleado?: IEmpleado
  calificacion?: number
  aprobado?: boolean
  createdAt?: Date
  updatedAt?: Date
}
