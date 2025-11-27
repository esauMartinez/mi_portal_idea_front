import type { IClase } from './clase'
import type { IClaseEmpleado } from './clase_empleado'

export interface ICalificacionesClase {
  clase: IClase
  claseEmpleado: IClaseEmpleado[]
}
