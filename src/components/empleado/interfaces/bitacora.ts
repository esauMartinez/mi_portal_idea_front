import type { IEmpleado } from './empleado'

export interface IBitacoraEmpleado {
  id?: number
  evento: string
  fecha?: Date
  descripcion: string
  empleadoId: number
  empleado?: IEmpleado
  empleadoEventoId?: number
  empleadoEvento?: IEmpleado
}
