import type { IPermiso } from './permiso'

export interface IModulo {
  id: number
  nombre: string
  permisos: IPermiso[]
}
