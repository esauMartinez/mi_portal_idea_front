import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import SucursalesPage from '@/pages/SucursalesPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaSucursales from '../ui/ListaSucursales.vue'
import CrearSucursal from '../ui/CrearSucursal.vue'
import ModificarSucursal from '../ui/ModificarSucursal.vue'
import BitacoraSucursal from '../ui/BitacoraSucursal.vue'

export const sucursalRutas: RouteRecordRaw = {
  path: '/sucursales',
  name: 'sucursales',
  redirect: { name: 'lista-sucursales' },
  component: SucursalesPage,
  children: [
    {
      path: '/lista-sucursales',
      name: 'lista-sucursales',
      meta: {
        ruta_permitida: 'Sucursales.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaSucursales,
      children: [
        {
          path: '/crear-sucursal',
          name: 'crear-sucursal',
          meta: {
            ruta_permitida: 'Sucursales.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearSucursal,
        },
        {
          path: '/modificar-sucursal/:id',
          name: 'modificar-sucursal',
          meta: {
            ruta_permitida: 'Sucursales.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarSucursal,
        },
        {
          path: '/bitacora-sucursal/:id',
          name: 'bitacora-sucursal',
          meta: {
            ruta_permitida: 'Sucursales.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraSucursal,
        },
      ],
    },
  ],
}
