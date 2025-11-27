import type { IRequerimientoCurso } from './requerimiento_curso'

export interface ICurso {
  id: number
  tipo: 'interno' | 'externo' | ''
  nombre: string
  estatus: boolean
  requerimientosCursos: IRequerimientoCurso[]
}
