import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import OrdenesPage from '@/pages/OrdenesPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaOrdenes from '../ui/ListaOrdenes.vue'
import CrearOrden from '../ui/CrearOrden.vue'
import ModificarOrden from '../ui/ModificarOrden.vue'
import BitacoraOrden from '../ui/BitacoraOrden.vue'

export const ordenRutas: RouteRecordRaw = {
  path: '/ordenes',
  name: 'ordenes',
  redirect: { name: 'lista-ordenes' },
  component: OrdenesPage,
  children: [
    {
      path: '/lista-ordenes',
      name: 'lista-ordenes',
      meta: {
        ruta_permitida: 'Ordenes.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaOrdenes,
      children: [
        {
          path: '/crear-orden',
          name: 'crear-orden',
          meta: {
            ruta_permitida: 'Ordenes.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearOrden,
        },
        {
          path: '/modificar-orden/:id',
          name: 'modificar-orden',
          meta: {
            ruta_permitida: 'Ordenes.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarOrden,
        },
        {
          path: '/bitacora-orden/:id',
          name: 'bitacora-orden',
          meta: {
            ruta_permitida: 'Ordenes.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraOrden,
        },
      ],
    },
  ],
}
