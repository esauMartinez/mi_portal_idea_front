import { api_mi_portal } from '@/api'
import type { IOrden } from '../interfaces/orden'

export const getOrdenes = async (): Promise<IOrden[]> => {
  const { data } = await api_mi_portal.get<IOrden[]>(`/ordenes`)
  return data
}

export const getOrden = async (id: number): Promise<IOrden> => {
  const { data } = await api_mi_portal.get<IOrden>(`/orden/${id}`)
  return data
}

export const postOrden = async (payload: IOrden): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/orden`, payload)
  return data
}

export const updateOrden = async (payload: IOrden): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/orden`, payload)
  return data
}

export const deleteOrden = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/orden/${id}`)
  return data
}

// export const getBitacora = async (id: number): Promise<IBitacoraPuesto[]> => {
//   const { data } = await api_mi_portal.get<IBitacoraPuesto[]>(`/puesto/bitacora/${id}`)
//   return data
// }
