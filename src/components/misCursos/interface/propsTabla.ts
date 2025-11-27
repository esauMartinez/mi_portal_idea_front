import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'

export interface PropsTabla {
  misCursos: IClaseEmpleado[]
  empleado: boolean
  cargando: boolean
}
