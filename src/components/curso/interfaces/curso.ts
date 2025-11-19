import type { IRequerimientoCurso } from './requerimiento_curso'

export interface ICurso {
  id: number
  nombre: string
  estatus: boolean
  requerimientosCursos: IRequerimientoCurso[]
}
