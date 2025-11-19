import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export const formatearNombre = (empleado: IEmpleado): string => {
  if (!empleado) return ''

  const partes = [
    empleado.primerNombre,
    empleado.segundoNombre,
    empleado.apellidoPaterno,
    empleado.apellidoMaterno,
  ].filter(Boolean) // Filtra valores undefined, null o vacíos

  return partes.join(' ').trim()
}
