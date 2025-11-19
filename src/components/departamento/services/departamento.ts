import { api_mi_portal } from '@/api'
import type { IDepartamento } from '../interfaces/departamento'
import type { IBitacoraDepartamento } from '../interfaces/bitacora_departamento'

export const getDepartamentos = async (): Promise<IDepartamento[]> => {
  const { data } = await api_mi_portal.get<IDepartamento[]>(`/departamentos`)
  return data
}

export const getDepartamento = async (id: number): Promise<IDepartamento> => {
  const { data } = await api_mi_portal.get<IDepartamento>(`/departamento/${id}`)
  return data
}

export const postDepartamento = async (payload: IDepartamento): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/departamento`, payload)
  return data
}

export const updateDepartamento = async (payload: IDepartamento): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/departamento`, payload)
  return data
}

export const deleteDepartamento = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/departamento/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraDepartamento[]> => {
  const { data } = await api_mi_portal.get<IBitacoraDepartamento[]>(`/departamento/bitacora/${id}`)
  return data
}
