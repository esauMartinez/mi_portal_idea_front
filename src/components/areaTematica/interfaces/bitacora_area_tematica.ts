import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraAreaTematica {
  id: number
  evento: string
  fecha: Date
  areaTematicaId: number
  empleadoId: number
  empleado: IEmpleado
}
