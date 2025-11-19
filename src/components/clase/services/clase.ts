import { api_mi_portal } from '@/api'
import type { IClase } from '../interfaces/clase'
import type { IClaseEmpleado } from '../interfaces/clase_empleado'
import type { IClaseInstructor } from '../interfaces/clase_instructor'
import type { IAreaTematica } from '../interfaces/area_tematica'
import type { IEnlaceClase } from '../interfaces/enlaceClase'

export const getClases = async (
  inicio: string,
  fin: string,
  estatus: string,
): Promise<IClase[]> => {
  const { data } = await api_mi_portal.get<IClase[]>(`/clases`, {
    params: {
      inicio,
      fin,
      estatus,
    },
  })
  return data
}

export const getClase = async (id: number): Promise<IClase> => {
  const { data } = await api_mi_portal.get<IClase>(`/clase/${id}`)
  return data
}

export const postClase = async (payload: IClase): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/clase`, payload)
  return data
}

export const putClase = async (payload: IClase): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/clase/${payload.id}`, payload)
  return data
}

export const deleteClase = async (clase: IClase): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/clase/${clase.id}`, {
    params: { id: clase.id, estatus: clase.estatus },
  })
  return data
}

export const getInstructoresClase = async (id: number): Promise<IClaseInstructor[]> => {
  const { data } = await api_mi_portal.get<IClaseInstructor[]>(`/clase/instructores/${id}`)
  return data
}

export const postInstructorClase = async (payload: IClaseInstructor): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/clase/agregar-instructor`, payload)
  return data
}

export const deleteInstructorClase = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/clase/eliminar-instructor/${id}`)
  return data
}

export const getAlumnosClase = async (id: number): Promise<IClaseEmpleado[]> => {
  const { data } = await api_mi_portal.get<IClaseEmpleado[]>(`/clase/alumnos/${id}`)
  return data
}

export const postAlumnoClase = async (payload: IClaseEmpleado): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/clase/agregar-alumno`, payload)
  return data
}

export const deleteAlumnoClase = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/clase/eliminar-alumno/${id}`)
  return data
}

export const postCalificaciones = async (payload: IClaseEmpleado[]): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/clase/calificaciones`, payload)
  return data
}

export const getAreasTematicas = async (): Promise<IAreaTematica[]> => {
  const { data } = await api_mi_portal.get<IAreaTematica[]>(`/areas-tematicas`)
  return data
}

export const postEnlaces = async (payload: IEnlaceClase[]): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/enlace/clase`, payload)
  return data
}
