import type { IPerfilPermiso } from './perfilPermiso'

export interface IPerfil {
  id?: number
  nombre: string

  perfilesPermisos: IPerfilPermiso[]
}
