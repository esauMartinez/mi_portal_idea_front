import { api_mi_portal } from '@/api'
import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'
import { timer } from '@/helper/timer'

export const getDatosPdf = async (id: number): Promise<IClaseEmpleado> => {
  await timer()
  const { data } = await api_mi_portal.get<IClaseEmpleado>(`/datos-pdf/${id}`)
  return data
}
