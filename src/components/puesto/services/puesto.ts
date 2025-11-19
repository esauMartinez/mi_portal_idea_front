import { api_mi_portal } from '@/api'
import type { IPuesto } from '../interfaces/puesto'
import type { IBitacoraPuesto } from '../interfaces/bitacora_puesto'

export const getPuestos = async (): Promise<IPuesto[]> => {
  const { data } = await api_mi_portal.get<IPuesto[]>(`/puestos`)
  return data
}

export const getPuesto = async (id: number): Promise<IPuesto> => {
  const { data } = await api_mi_portal.get<IPuesto>(`/puesto/${id}`)
  return data
}

export const postPuesto = async (payload: IPuesto): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/puesto`, payload)
  return data
}

export const updatePuesto = async (payload: IPuesto): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/puesto`, payload)
  return data
}

export const deletePuesto = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/puesto/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraPuesto[]> => {
  const { data } = await api_mi_portal.get<IBitacoraPuesto[]>(`/puesto/bitacora/${id}`)
  return data
}
