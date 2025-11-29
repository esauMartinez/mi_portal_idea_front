import { api_mi_portal } from '@/api'
import type { IEmpresa } from '../interfaces/empresa'
import type { IBitacoraEmpresa } from '../interfaces/bitacora_empresa'

export const getEmpresas = async (): Promise<IEmpresa[]> => {
  const { data } = await api_mi_portal.get<IEmpresa[]>(`/empresas`)
  return data
}

export const getEmpresasPorNombre = async (nombre: string): Promise<IEmpresa[]> => {
  const { data } = await api_mi_portal.get<IEmpresa[]>(`/empresas/${nombre}`)
  return data
}

export const getEmpresa = async (id: number): Promise<IEmpresa> => {
  const { data } = await api_mi_portal.get<IEmpresa>(`/empresa/${id}`)
  return data
}

export const postEmpresa = async (payload: IEmpresa): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/empresa`, payload)
  return data
}

export const updateEmpresa = async (payload: IEmpresa): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/empresa`, payload)
  return data
}

export const deleteEmpresa = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/empresa/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraEmpresa[]> => {
  const { data } = await api_mi_portal.get<IBitacoraEmpresa[]>(`/empresa/bitacora/${id}`)
  return data
}
