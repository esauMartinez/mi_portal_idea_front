import { api_mi_portal } from '@/api'
import type { IUbicacion } from '../interfaces/ubicacion'
import type { IBitacoraUbicacion } from '../interfaces/bitacora_ubicacion'

export const getUbicaciones = async (): Promise<IUbicacion[]> => {
  const { data } = await api_mi_portal.get<IUbicacion[]>(`/ubicaciones`)
  return data
}

export const getUbicacion = async (id: number): Promise<IUbicacion> => {
  const { data } = await api_mi_portal.get<IUbicacion>(`/ubicacion/${id}`)
  return data
}

export const postUbicacion = async (payload: IUbicacion): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/ubicacion`, payload)
  return data
}

export const updateUbicacion = async (payload: IUbicacion): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/ubicacion/${payload.id}`, payload)
  return data
}

export const deleteUbicacion = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/ubicacion/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraUbicacion[]> => {
  const { data } = await api_mi_portal.get<IBitacoraUbicacion[]>(`/ubicacion/bitacora/${id}`)
  return data
}
