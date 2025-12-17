import type { IEmpleado } from '@/components/empleado/interfaces/empleado'
import { formatearNombre } from '@/helper/formatearNombre'

export const nombreEmpleado = async () => {
  const storage = localStorage.getItem('empleado')
  if (storage === null) {
    return ''
  }

  const user_data = JSON.parse(storage || '')
  const empleado = user_data.data as IEmpleado
  return formatearNombre(empleado)
}
