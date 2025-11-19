import { api_mi_portal } from '@/api'
import type { IPerfil } from '../interfaces/perfil'
import { timer } from '@/helper/timer'

export const getPerfiles = async (): Promise<IPerfil[]> => {
  const { data } = await api_mi_portal.get<IPerfil[]>(`/perfiles`)
  return data
}

export const getPerfil = async (id: number): Promise<IPerfil> => {
  await timer()
  const { data } = await api_mi_portal.get<IPerfil>(`/perfil/${id}`)
  return data
}

export const postPerfil = async (payload: IPerfil): Promise<string> => {
  await timer()
  const { data } = await api_mi_portal.post<string>(`/perfil`, payload)
  return data
}

export const updatePerfil = async (payload: IPerfil): Promise<string> => {
  await timer()
  const { data } = await api_mi_portal.put<string>(`/perfil`, payload)
  return data
}

export const deletePerfil = async (id: number): Promise<string> => {
  await timer()
  const { data } = await api_mi_portal.delete<string>(`/perfil/${id}`)
  return data
}
