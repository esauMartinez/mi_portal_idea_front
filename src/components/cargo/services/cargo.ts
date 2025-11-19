import { api_mi_portal } from '@/api'
import type { ICargo } from '../interfaces/cargo'
import type { IBitacoraCargo } from '../interfaces/bitacora_cargo'

export const getCargos = async (): Promise<ICargo[]> => {
  const { data } = await api_mi_portal.get<ICargo[]>(`/cargos`)
  return data
}

export const getCargo = async (id: number): Promise<ICargo> => {
  const { data } = await api_mi_portal.get<ICargo>(`/cargo/${id}`)
  return data
}

export const postCargo = async (payload: ICargo): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/cargo`, payload)
  return data
}

export const updateCargo = async (payload: ICargo): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/cargo`, payload)
  return data
}

export const deleteCargo = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/cargo/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraCargo[]> => {
  const { data } = await api_mi_portal.get<IBitacoraCargo[]>(`/cargo/bitacora/${id}`)
  return data
}
