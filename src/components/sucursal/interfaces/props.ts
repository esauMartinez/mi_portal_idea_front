import type { ISucursal } from './sucursal'

export interface Props {
  sucursal?: ISucursal
  cancelar: () => void
  guardar: (sucursal: ISucursal) => void
  pendiente: boolean
}
