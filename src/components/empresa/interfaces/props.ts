import type { IEmpresa } from './empresa'

export interface Props {
  empresa?: IEmpresa
  cancelar: () => void
  guardar: (empresa: IEmpresa) => void
  pendiente: boolean
}
