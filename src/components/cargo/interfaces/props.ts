import type { ICargo } from './cargo'

export interface Props {
  cargo?: ICargo
  cancelar: () => void
  guardar: (cargo: ICargo) => void
  pendiente: boolean
}
