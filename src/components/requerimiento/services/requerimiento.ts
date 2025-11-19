import { api_mi_portal } from '@/api'
import type { IRequerimiento } from '../interface/requerimineto'
import type { IBitacoraRequerimiento } from '../interface/bitacora_requerimiento'

export const getRequerimientos = async (): Promise<IRequerimiento[]> => {
  const { data } = await api_mi_portal.get<IRequerimiento[]>(`/requerimientos`)
  return data
}

export const getRequerimiento = async (id: number): Promise<IRequerimiento> => {
  const { data } = await api_mi_portal.get<IRequerimiento>(`/requerimiento/${id}`)
  return data
}

export const postRequerimiento = async (payload: IRequerimiento): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/requerimiento`, payload)
  return data
}

export const putRequerimiento = async (payload: IRequerimiento): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/requerimiento`, payload)
  return data
}

export const deleteRequerimiento = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/requerimiento/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraRequerimiento[]> => {
  const { data } = await api_mi_portal.get<IBitacoraRequerimiento[]>(
    `/requerimiento/bitacora/${id}`,
  )
  return data
}
