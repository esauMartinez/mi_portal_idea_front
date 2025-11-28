import type { IModelo } from './modelo'

export interface Props {
  modelo?: IModelo
  cancelar: () => void
  guardar: (modelo: IModelo) => void
  pendiente: boolean
}
