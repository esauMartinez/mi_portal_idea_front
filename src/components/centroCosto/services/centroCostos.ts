import { api_mi_portal } from '@/api'
import type { ICentroCosto } from '../interfaces/centro_costo'
import type { IBitacoraCentroCosto } from '../interfaces/bitacora_centro_costo'

export const getCentrosCostos = async (): Promise<ICentroCosto[]> => {
  const { data } = await api_mi_portal.get<ICentroCosto[]>(`/centros-costos`)
  return data
}

export const getCentroCosto = async (id: number): Promise<ICentroCosto> => {
  const { data } = await api_mi_portal.get<ICentroCosto>(`/centro-costo/${id}`)
  return data
}

export const postCentroCosto = async (payload: ICentroCosto): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/centro-costo`, payload)
  return data
}

export const updateCentroCosto = async (payload: ICentroCosto): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/centro-costo`, payload)
  return data
}

export const deleteCentroCosto = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/centro-costo/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraCentroCosto[]> => {
  const { data } = await api_mi_portal.get<IBitacoraCentroCosto[]>(`/centro-costo/bitacora/${id}`)
  return data
}
