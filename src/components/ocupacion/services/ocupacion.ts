import { api_mi_portal } from '@/api'
import type { IOcupacion } from '../interfaces/ocupacion'

export const getOcupaciones = async (): Promise<IOcupacion[]> => {
  const { data } = await api_mi_portal.get<IOcupacion[]>(`/ocupaciones`)
  return data
}

export const getOcupacion = async (id: number): Promise<IOcupacion> => {
  const { data } = await api_mi_portal.get<IOcupacion>(`/ocupacion/${id}`)
  return data
}

export const postOcupacion = async (payload: IOcupacion): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/ocupacion`, payload)
  return data
}

export const updateOcupacion = async (payload: IOcupacion): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/ocupacion/${payload.id}`, payload)
  return data
}

export const deleteOcupacion = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/ocupacion/${id}`)
  return data
}

// export const getBitacora = async (id: number): Promise<IBitacoraUbicacion[]> => {
//   const { data } = await api_mi_portal.get<IBitacoraUbicacion[]>(`/ubicacion/bitacora/${id}`)
//   return data
// }
