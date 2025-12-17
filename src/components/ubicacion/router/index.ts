import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import UbicacionPage from '@/pages/UbicacionPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaUbicaciones from '../ui/ListaUbicaciones.vue'
import CrearUbicacion from '../ui/CrearUbicacion.vue'
import ModificarUbicacion from '../ui/ModificarUbicacion.vue'
import BitacoraUbicacion from '../ui/BitacoraUbicacion.vue'

export const ubicacionRutas: RouteRecordRaw = {
  path: '/ubicaciones',
  name: 'ubicaciones',
  component: UbicacionPage,
  redirect: { name: 'lista-ubicaciones' },
  children: [
    {
      path: '/lista-ubicaciones',
      name: 'lista-ubicaciones',
      meta: {
        ruta_permitida: 'Ubicaciones.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaUbicaciones,
      children: [
        {
          path: '/crear-ubicacion',
          name: 'crear-ubicacion',
          meta: {
            ruta_permitida: 'Ubicaciones.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearUbicacion,
        },
        {
          path: '/modificar-ubicacion/:id',
          name: 'modificar-ubicacion',
          meta: {
            ruta_permitida: 'Ubicaciones.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarUbicacion,
        },
        {
          path: '/bitacora-ubicacion/:id',
          name: 'bitacora-ubicacion',
          meta: {
            ruta_permitida: 'Ubicaciones.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraUbicacion,
        },
      ],
    },
  ],
}
