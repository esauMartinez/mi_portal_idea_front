import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export interface IAuthResponse {
  data: IEmpleado
  token: string
}
