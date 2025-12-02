import { api_mi_portal } from '@/api'
import type { IRecuperar } from '../interfaces/recuperar'
import { timer } from '@/helper/timer'
import type { IOlvidada } from '../interfaces/olvidada'

export const olvidada = async (payload: IOlvidada): Promise<string> => {
  await timer()

  const { data } = await api_mi_portal.post<string>('/password-olvidada', payload)

  return data
}

export const recuperar = async (payload: IRecuperar): Promise<string> => {
  await timer()
  api_mi_portal.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
  const { data } = await api_mi_portal.post<string>('/recuperar-password', payload)
  return data
}
