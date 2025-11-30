import { api_mi_portal } from '@/api'
import type { IModelo } from '../interfaces/modelo'
import type { IBitacoraModelo } from '../interfaces/bitacora_modelo'

export const getModelos = async (): Promise<IModelo[]> => {
  const { data } = await api_mi_portal.get<IModelo[]>(`/modelos`)
  return data
}

export const getModelo = async (id: number): Promise<IModelo> => {
  const { data } = await api_mi_portal.get<IModelo>(`/modelo/${id}`)
  return data
}

export const postModelo = async (payload: IModelo): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/modelo`, payload)
  return data
}

export const updateModelo = async (payload: IModelo): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/modelo/${payload.id}`, payload)
  return data
}

export const deleteModelo = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/modelo/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraModelo[]> => {
  const { data } = await api_mi_portal.get<IBitacoraModelo[]>(`/modelo/bitacora/${id}`)
  return data
}
