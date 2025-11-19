import type { IUbicacion } from './ubicacion'

export interface Props {
  ubicacion?: IUbicacion
  cancelar: () => void
  guardar: (ubicacion: IUbicacion) => void
  pendiente: boolean
}
