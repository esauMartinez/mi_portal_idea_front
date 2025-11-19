import type { IOcupacion } from './ocupacion'

export interface IOcupacionEmpleado {
  id?: number
  empleadoId: number
  ocupacionId: number
  nombre?: string
  ocupacion?: IOcupacion
}
