import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraPerfil {
  id: number
  evento: string
  fecha: Date
  perfilId: number
  empleadoId: number
  empleado: IEmpleado
}
