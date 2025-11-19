import { api_mi_portal } from '@/api'
import type { ICurso } from '../interfaces/curso'
import type { IBitacoraCurso } from '../interfaces/bitacora_curso'

export const getCursos = async (): Promise<ICurso[]> => {
  const { data } = await api_mi_portal.get<ICurso[]>(`/cursos`)
  return data
}

export const getCurso = async (id: number): Promise<ICurso> => {
  const { data } = await api_mi_portal.get<ICurso>(`/curso/${id}`)
  return data
}

export const postCurso = async (payload: ICurso): Promise<string> => {
  const { data } = await api_mi_portal.post<string>(`/curso`, payload)
  return data
}

export const putCurso = async (payload: ICurso): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/curso/${payload.id}`, payload)
  return data
}

export const deleteCurso = async (id: number): Promise<string> => {
  const { data } = await api_mi_portal.delete<string>(`/curso/${id}`)
  return data
}

export const getBitacora = async (id: number): Promise<IBitacoraCurso[]> => {
  const { data } = await api_mi_portal.get<IBitacoraCurso[]>(`/curso/bitacora/${id}`)
  return data
}
