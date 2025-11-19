import { api_mi_portal } from '@/api'
import type { IAuth } from '../interfaces/auth'
import { timer } from '@/helper/timer'

export const auth = async (payload: IAuth) => {
  await timer()
  const { data } = await api_mi_portal.post('/auth', payload)

  return data
}
