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

export const verificarSiMostrarGestion = () => {
  const empleados = verificarPermiso('Empleados.Ver')
  const perfiles = verificarPermiso('Perfiles.Ver')
  const ubicaciones = verificarPermiso('Ubicaciones.Ver')
  const departamentos = verificarPermiso('Departamentos.Ver')
  const empresas = verificarPermiso('Empresas.Ver')
  const sucursales = verificarPermiso('Sucursales.Ver')
  const cargos = verificarPermiso('Cargos.Ver')
  const centrosCostos = verificarPermiso('CentrosCostos.Ver')
  const ocupacionesEspecificas = verificarPermiso('Ocupaciones.Ver')
  const areasTematicas = verificarPermiso('AreasTematicas.Ver')
  const modelos = verificarPermiso('Modelos.Ver')

  if (
    empleados ||
    perfiles ||
    ubicaciones ||
    departamentos ||
    empresas ||
    sucursales ||
    cargos ||
    centrosCostos ||
    ocupacionesEspecificas ||
    areasTematicas ||
    modelos
  ) {
    return true
  }
  return false
}

export const verificarSiMostrarCapacitacion = () => {
  const cursos = verificarPermiso('Cursos.Ver')
  const clases = verificarPermiso('Clases.Ver')
  const requerimientos = verificarPermiso('Requerimientos.Ver')

  if (cursos || clases || requerimientos) {
    return true
  }
  return false
}
