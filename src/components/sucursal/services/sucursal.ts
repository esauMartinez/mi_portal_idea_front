import { api_mi_portal } from '@/api'
import type { ISucursal } from '../interfaces/sucursal'
import type { IBitacoraSucursal } from '../interfaces/bitacora_sucursal'

export const getSucursales = async (): Promise<ISucursal[]> => {
  const { data } = await api_mi_portal.get<ISucursal[]>(`/sucursales`)
  return data
}

export const getSucursal = async (id: number): Promise<ISucursal> => {
  const { data } = await api_mi_portal.get<ISucursal>(`/sucursal/${id}`)
  return data
}

export const postSucursal = async (payload: ISucursal): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/sucursal`, payload)
  return data
}

export const updateSucursal = async (payload: ISucursal): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/sucursal`, payload)
  return data
}

export const deleteSucursal = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/sucursal/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraSucursal[]> => {
  const { data } = await api_mi_portal.get<IBitacoraSucursal[]>(`/sucursal/bitacora/${id}`)
  return data
}
