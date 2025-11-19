import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IBitacoraEmpresa {
  id: number
  evento: string
  fecha: Date
  empresaId: number
  empleadoId: number
  empleado: IEmpleado
}
