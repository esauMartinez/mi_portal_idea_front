import { api_mi_portal } from '@/api'
import type { IOrden } from '../interfaces/orden'
import type { IBitacoraOrden } from '../interfaces/bitacora_orden'

export const getOrdenes = async (estatus: string, empresaId: number): Promise<IOrden[]> => {
  const { data } = await api_mi_portal.get<IOrden[]>(`/ordenes`, {
    params: {
      estatus,
      empresaId,
    },
  })
  return data
}

export const getOrden = async (id: number): Promise<IOrden> => {
  const { data } = await api_mi_portal.get<IOrden>(`/orden/${id}`)
  return data
}

export const postOrden = async (payload: FormData): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/orden`, payload)
  return data
}

export const updateOrden = async (payload: FormData): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/orden`, payload)
  return data
}

export const deleteOrden = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/orden/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraOrden[]> => {
  const { data } = await api_mi_portal.get<IBitacoraOrden[]>(`/orden/bitacora/${id}`)
  return data
}
