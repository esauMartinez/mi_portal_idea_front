import type { IAreaTematica } from './area_tematica'

export interface Props {
  areaTematica?: IAreaTematica
  cancelar: () => void
  guardar: (areaTematica: IAreaTematica) => void
  pendiente: boolean
}
