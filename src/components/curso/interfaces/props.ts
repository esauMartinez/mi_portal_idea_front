import type { IRequerimiento } from '@/components/requerimiento/interface/requerimineto'
import type { ICurso } from './curso'
import type { IRequerimientoCurso } from './requerimiento_curso'

export interface Props {
  curso?: ICurso
  cancelar: () => void
  guardar: (curso: ICurso) => void
  pendiente: boolean
}

export interface PropsRequerimientosCurso {
  cursoId?: number
  requerimientos?: IRequerimientoCurso[]
  agregarRequerimiento: (requerimiento: IRequerimiento) => void
  eliminarRequerimiento: (id: number) => void
}
