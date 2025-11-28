import type { IOcupacion } from '../../ocupacion/interfaces/ocupacion'

export interface IOcupacionEmpleado {
  id?: number
  empleadoId: number
  ocupacionId: number
  nombre?: string
  ocupacion?: IOcupacion
}
