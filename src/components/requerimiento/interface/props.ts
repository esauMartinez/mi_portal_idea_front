import type { IRequerimiento } from './requerimineto'

export interface Props {
  requerimiento?: IRequerimiento
  cancelar: () => void
  guardar: (empleado: IRequerimiento) => void
  pendiente: boolean
}

export interface PropsTabla {
  modulo: boolean
  seleccionarRequerimiento?: (payload: IRequerimiento) => void
}
