import { api_mi_portal } from '@/api'
import type { IModulo } from '../interfaces/modulo'

export const getModulos = async (): Promise<IModulo[]> => {
  const { data } = await api_mi_portal.get<IModulo[]>(`/modulos`)
  return data
}
