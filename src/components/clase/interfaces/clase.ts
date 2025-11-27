import type { ICurso } from '@/components/curso/interfaces/curso'
import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import type { IOcupacion } from '@/components/empleado/interfaces/ocupacion'
import type { IAreaTematica } from './area_tematica'
import type { IEnlaceClase } from './enlaceClase'

export interface IClase {
  id: number
  fechaInicio: Date
  horaInicio: Date | string
  fechaFinalizacion: Date
  horaFinalizacion: Date | string
  duracion: string
  estatus: 'pendiendte' | 'en curso' | 'finalizada' | string
  cursoId: number
  curso: ICurso
  minimoAlumnos: number
  maximoAlumnos: number
  calificada: boolean
  ubicacionId: number
  sala: string
  enlazada: boolean
  padre: boolean

  representanteEmpresaId: number
  representanteEmpresa: IEmpleado
  representanteEmpleadosId: number
  representanteEmpleados: IEmpleado
  empleadoCalifica: IEmpleado

  ocupacionId: number
  ocupacion: IOcupacion
  areaTematicaId: number
  areaTematica: IAreaTematica

  padres: IEnlaceClase[]
  hijos: IEnlaceClase[]

  // numero de clases que se crearan desde el inicio
  clases: number
}
