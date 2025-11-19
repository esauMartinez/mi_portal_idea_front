import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import type { IClase } from './clase'
import type { IRequerimientoCurso } from '@/components/curso/interfaces/requerimiento_curso'
import type { IClaseEmpleado } from './clase_empleado'

export interface Props {
  clase?: IClase
  cancelar: () => void
  guardar?: (empleado: IClase) => void
  pendiente: boolean
  ver?: boolean
}

export interface PropsTablaInstructores {
  instructores: IEmpleado[]
  estatus: string
  error: boolean
  agregarInstructor: (empleado: IEmpleado) => void
  eliminarInstructor: (id: number) => void
}

export interface PropsTablaAlumnos {
  alumnos: IEmpleado[]
  estatus: string
  error: boolean
  agregarAlumno: (empleado: IEmpleado) => void
  eliminarAlumno: (id: number) => void
}

export interface PropsTablaRequerimientosCurso {
  requerimientosCurso: IRequerimientoCurso[]
}

export interface PropstTablaCalificaciones {
  guardarCalificaciones: (calificacionesEmpleados: IClaseEmpleado[]) => void
  cancelar: () => void
}

export interface PropsTablaEnlaces {
  cancelar: () => void
}
