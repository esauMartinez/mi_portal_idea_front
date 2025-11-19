import type { IEmpleado } from '@/components/empleado/interfaces/empleado'

export const verificarPermiso = (permiso: string) => {
  const storage = localStorage.getItem('empleado')
  if (storage === null) {
    return false
  }
  const data = JSON.parse(storage || '').data as IEmpleado
  const permisos = data.perfil.perfilesPermisos
  const verificar = permisos.find((x) => x.permiso!.nombre === permiso)
  if (verificar === undefined) {
    return false
  }
  return true
}
