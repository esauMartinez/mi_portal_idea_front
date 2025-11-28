import type { IOcupacion } from './ocupacion'

export interface Props {
  ocupacion?: IOcupacion
  cancelar: () => void
  guardar: (ocupacion: IOcupacion) => void
  pendiente: boolean
}
