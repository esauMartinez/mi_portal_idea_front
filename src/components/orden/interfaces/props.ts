import type { IOrden } from './orden'

export interface Props {
  orden?: IOrden
  cancelar: () => void
  guardar: (orden: IOrden) => void
  pendiente: boolean
}
