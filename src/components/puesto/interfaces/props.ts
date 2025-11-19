import type { IPuesto } from './puesto'

export interface Props {
  puesto?: IPuesto
  cancelar: () => void
  guardar: (puesto: IPuesto) => void
  pendiente: boolean
}
