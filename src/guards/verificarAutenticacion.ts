import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { verificarEmpleado } from './verificarEmpleado'
import { verificarPermiso } from './verificarPermiso'
import { verificarLocalStorage } from './verificarLocalStorage'
import { nombreEmpleado } from './nombreEmpleado'

export const verificarAutenticacion = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const isAutenticated = await verificarEmpleado()
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.ruta_permitida)) {
    const permiso = to.meta.ruta_permitida as string
    if (verificarPermiso(permiso)) {
      next()
    } else {
      next('/unauthorized')
    }
  } else {
    if (!isAutenticated && to.name !== 'auth') {
      next('/')
    } else if (isAutenticated && to.name === 'auth') {
      next('/home')
    } else {
      next()
    }
  }

  if (isAutenticated) {
    authStore.setAutenticado(true)
    const empleado = await nombreEmpleado()
    authStore.setNombreEmpleado(empleado)
    await verificarLocalStorage()
  } else {
    authStore.setAutenticado(false)
  }
}
