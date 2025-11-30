import { api_mi_portal } from '@/api'
import type { IAreaTematica } from '../interfaces/area_tematica'
import type { IBitacoraAreaTematica } from '../interfaces/bitacora_area_tematica'

export const getAreasTematicas = async (): Promise<IAreaTematica[]> => {
  const { data } = await api_mi_portal.get<IAreaTematica[]>(`/areas-tematicas`)
  return data
}

export const getAreasTematicasPorNombre = async (nombre: string): Promise<IAreaTematica[]> => {
  const { data } = await api_mi_portal.get<IAreaTematica[]>(`/areas-tematicas-por-nombre`, {
    params: {
      nombre,
    },
  })
  return data
}

export const getAreaTematica = async (id: number): Promise<IAreaTematica> => {
  const { data } = await api_mi_portal.get<IAreaTematica>(`/area-tematica/${id}`)
  return data
}

export const postAreaTematica = async (payload: IAreaTematica): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/area-tematica`, payload)
  return data
}

export const updateAreaTematica = async (payload: IAreaTematica): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/area-tematica/${payload.id}`, payload)
  return data
}

export const deleteAreaTematica = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/area-tematica/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraAreaTematica[]> => {
  const { data } = await api_mi_portal.get<IBitacoraAreaTematica[]>(`/area-tematica/bitacora/${id}`)
  return data
}
