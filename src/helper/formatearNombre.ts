import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export const formatearNombre = (empleado: IEmpleado): string => {
  if (!empleado) return ''

  const partes = [
    empleado.primerNombre,
    empleado.segundoNombre,
    empleado.apellidoPaterno,
    empleado.apellidoMaterno,
  ]
    .map((p) => (p == null ? '' : String(p).trim()))
    .filter((p) => p && p.toLowerCase() !== 'undefined')

  return partes.join(' ').trim()
}
