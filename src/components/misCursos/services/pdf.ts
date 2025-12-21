import { api_mi_portal } from '@/api'
import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'
import { timer } from '@/helper/timer'

export const getDatosPdf = async (id: number): Promise<IClaseEmpleado> => {
  await timer()
  const { data } = await api_mi_portal.get<IClaseEmpleado>(`/datos-pdf/${id}`)
  return data
}
export const getCertificadosPdf = async (certificados: number[]): Promise<IClaseEmpleado[]> => {
  await timer()
  const { data } = await api_mi_portal.post<IClaseEmpleado[]>(`/certificados-pdf`, certificados)
  return data
}

export const updateMiCurso = async (payload: IClaseEmpleado): Promise<string> => {
  const { data } = await api_mi_portal.put<string>(`/mi-curso`, payload)
  return data
}
