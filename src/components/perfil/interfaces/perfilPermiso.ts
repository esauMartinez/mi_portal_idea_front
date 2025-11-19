import type { IPermiso } from './permiso'

export interface IPerfilPermiso {
  id?: number
  perfilId?: number
  permisoId?: number

  permiso?: IPermiso
}
