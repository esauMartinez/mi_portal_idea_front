import type { ICurso } from '@/components/curso/interfaces/curso'
import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import type { IOcupacion } from '@/components/ocupacion/interfaces/ocupacion'
import type { IAreaTematica } from '../../areaTematica/interfaces/area_tematica'
import type { IEnlaceClase } from './enlaceClase'
import type { IEmpresa } from '@/components/empresa/interfaces/empresa'
import type { IOrden } from '@/components/orden/interfaces/orden'
import type { IModelo } from '@/components/modelo/interfaces/modelo'

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
  empresaId: number
  empresa: IEmpresa
  archivos: boolean

  representanteEmpresaId: number
  representanteEmpresa: IEmpleado
  representanteEmpleadosId: number
  representanteEmpleados: IEmpleado
  empleadoCalifica: IEmpleado

  ocupacionId: number
  ocupacion: IOcupacion
  areaTematicaId: number
  areaTematica: IAreaTematica

  tieneOrden: boolean
  ordenId: number
  orden: IOrden

  modeloId: number
  modelo: IModelo

  padres: IEnlaceClase[]
  hijos: IEnlaceClase[]

  // numero de clases que se crearan desde el inicio
  clases: number
}
