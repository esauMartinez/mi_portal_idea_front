import type { IEmpleado } from './empleado'

export interface IJerarquia {
  id: number
  padreId: number
  padre: IEmpleado
  hijoId: number
  hijo: IEmpleado
}
