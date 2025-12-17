import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import RequerimientosPage from '@/pages/RequerimientosPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaRequerimientos from '../ui/ListaRequerimientos.vue'
import CrearRequerimiento from '../ui/CrearRequerimiento.vue'
import ModificarRequerimiento from '../ui/ModificarRequerimiento.vue'
import BitacoraRequerimiento from '../ui/BitacoraRequerimiento.vue'

export const requerimientoRutas: RouteRecordRaw = {
  path: '/requerimientos',
  name: 'requerimientos',
  redirect: { name: 'lista-requerimientos' },
  component: RequerimientosPage,
  children: [
    {
      meta: {
        ruta_permitida: 'Requerimientos.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      path: '/lista-requerimientos',
      name: 'lista-requerimientos',
      component: ListaRequerimientos,
      children: [
        {
          path: '/crear-requerimiento',
          name: 'crear-requerimiento',
          meta: {
            ruta_permitida: 'Requerimientos.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearRequerimiento,
        },
        {
          path: '/modificar-requerimiento/:id',
          name: 'modificar-requerimiento',
          meta: {
            ruta_permitida: 'Requerimientos.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarRequerimiento,
        },
        {
          path: '/bitacora-requerimiento/:id',
          name: 'bitacora-requerimiento',
          meta: {
            ruta_permitida: 'Requerimientos.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraRequerimiento,
        },
      ],
    },
  ],
}
