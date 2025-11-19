import type { IPerfil } from './perfil'

export interface Props {
  perfil?: IPerfil
  cancelar: () => void
  guardar: (empleado: IPerfil) => void
  pendiente: boolean
}
