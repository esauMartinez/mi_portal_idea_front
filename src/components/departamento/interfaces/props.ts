import type { IDepartamento } from './departamento'

export interface Props {
  departamento?: IDepartamento
  cancelar: () => void
  guardar: (ubicacion: IDepartamento) => void
  pendiente: boolean
}
