import { api_mi_portal } from '@/api'
import type { IEmpleado } from '../interfaces/empleado'
import { timer } from '@/helper/timer'
import type { IBitacoraEmpleado } from '../interfaces/bitacora'
import type { IJerarquia } from '../interfaces/jerarquia'
import type { IKardex } from '../interfaces/kardex'
import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'

export const getEmpleados = async (
  empresa: number,
  instructor: string,
  tipo: string,
): Promise<IEmpleado[]> => {
  const { data } = await api_mi_portal.get<IEmpleado[]>(`/empleados`, {
    params: {
      empresa,
      instructor,
      tipo,
    },
  })
  return data
}

export const getEmpleadosPorNombre = async (
  nombre: string,
  activo: boolean,
  instructor: boolean,
): Promise<IEmpleado[]> => {
  const { data } = await api_mi_portal.get<IEmpleado[]>(`/empleados-por-nombre`, {
    params: {
      nombre,
      activo,
      instructor,
    },
  })
  return data
}

export const getEmpleado = async (id: number): Promise<IEmpleado> => {
  const { data } = await api_mi_portal.get<IEmpleado>(`/empleado/${id}`)
  return data
}

export const postEmpleado = async (payload: FormData): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/empleado`, payload)
  return data
}

export const deleteEmpleado = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/empleado/${id}`)
  return data
}

export const updateEmpleado = async (payload: FormData): Promise<string> => {
  await timer()
  const { data } = await api_mi_portal.put<string>(`/empleado`, payload)
  return data
}

export const activar = async (payload: IEmpleado): Promise<string> => {
  await timer()
  const { data } = await api_mi_portal.put<string>(`/empleado/activar/${payload.id}`, payload)
  return data
}

export const desactivar = async (payload: IBitacoraEmpleado): Promise<string> => {
  await timer()
  const { data } = await api_mi_portal.put<string>(`/empleado/desactivar/${payload.id}`, payload)
  return data
}

export const getBitacoraEmpleado = async (id: number): Promise<IBitacoraEmpleado[]> => {
  const { data } = await api_mi_portal.get<IBitacoraEmpleado[]>(`/bitacora/empleado/${id}`)
  return data
}

export const getJerarquia = async (id: number): Promise<IJerarquia[]> => {
  const { data } = await api_mi_portal.get<IJerarquia[]>(`/jerarquia/${id}`)
  return data
}

export const getKardex = async (id: number): Promise<IKardex[]> => {
  const { data } = await api_mi_portal.get<IKardex[]>(`/kardex/${id}`)
  return data
}

export const postKardex = async (payload: IKardex): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/kardex`, payload)
  return data
}

export const deleteKardex = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/kardex/${id}`)
  return data
}

export const getMisCursos = async (): Promise<IClaseEmpleado[]> => {
  // await timer()
  const { data } = await api_mi_portal.get<IClaseEmpleado[]>(`/mis-cursos`)
  return data
}

export const getCursosEmpleado = async (id: number): Promise<IClaseEmpleado[]> => {
  const { data } = await api_mi_portal.get<IClaseEmpleado[]>(`/empleado/cursos/${id}`)
  return data
}
