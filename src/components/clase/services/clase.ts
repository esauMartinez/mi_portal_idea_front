import { api_mi_portal } from '@/api'
import type { IClase } from '../interfaces/clase'
import type { IClaseEmpleado } from '../interfaces/clase_empleado'
import type { IClaseInstructor } from '../interfaces/clase_instructor'
import type { IEnlaceClase } from '../interfaces/enlaceClase'
import type { ICalificacionesClase } from '../interfaces/calificacionesClase'
import type { IBitacoraClase } from '../interfaces/bitacora_clase'
import type { IArchivoClase } from '../interfaces/archivo_clase'

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

export const getAlumnosClase = async (id: number): Promise<ICalificacionesClase> => {
  const { data } = await api_mi_portal.get<ICalificacionesClase>(`/clase/alumnos/${id}`)
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

export const postEnlaces = async (payload: IEnlaceClase[]): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/enlaces/clases`, payload)
  return data
}

export const deleteEnlace = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/enlace/clase/${id}`)
  return data
}

export const getClasesPadres = async (): Promise<string> => {
  const { data } = await api_mi_portal.get<string>(`/clases/padres`)
  return data
}

export const postEnlace = async (payload: IEnlaceClase): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/enlace/clase`, payload)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraClase[]> => {
  const { data } = await api_mi_portal.get<IBitacoraClase[]>(`/clase/bitacora/${id}`)
  return data
}

export const getArchivosClase = async (id: number): Promise<IArchivoClase[]> => {
  const { data } = await api_mi_portal.get<IArchivoClase[]>(`/clase/archivos/${id}`)
  return data
}

export const postArchivosClase = async (payload: FormData): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/clase/archivos`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const deleteArchivoClase = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/clase/archivo/${id}`)
  return data
}
