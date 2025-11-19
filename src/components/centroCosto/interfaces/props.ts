import type { ICentroCosto } from './centro_costo'

export interface Props {
  centroCosto?: ICentroCosto
  cancelar: () => void
  guardar: (centroCosto: ICentroCosto) => void
  pendiente: boolean
}
