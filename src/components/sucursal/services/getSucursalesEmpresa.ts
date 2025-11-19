import { api_mi_portal } from '@/api'
import type { ISucursal } from '../interfaces/sucursal'

export const getSucursalesEmpresa = async (id: number): Promise<ISucursal[]> => {
  const { data } = await api_mi_portal.get<ISucursal[]>(`/sucursales-empresa/${id}`)
  return data
}
