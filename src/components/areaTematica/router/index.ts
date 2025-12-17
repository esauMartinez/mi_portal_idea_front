import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import AreasTematicasPage from '@/pages/AreasTematicasPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaAreasTematicas from '../ui/ListaAreasTematicas.vue'
import CrearAreaTematica from '../ui/CrearAreaTematica.vue'
import ModificarAreaTematica from '../ui/ModificarAreaTematica.vue'
import BitacoraAreaTematica from '../ui/BitacoraAreaTematica.vue'

export const areaTemaricaRutas: RouteRecordRaw = {
  path: '/areas-tematicas',
  name: 'areas-tematicas',
  redirect: { name: 'lista-areas-tematicas' },
  component: AreasTematicasPage,
  children: [
    {
      path: '/lista-areas-tematicas',
      name: 'lista-areas-tematicas',
      meta: {
        ruta_permitida: 'AreasTematicas.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaAreasTematicas,
      children: [
        {
          path: '/crear-area-tematica',
          name: 'crear-area-tematica',
          meta: {
            ruta_permitida: 'AreasTematicas.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearAreaTematica,
        },
        {
          path: '/modificar-area-tematica/:id',
          name: 'modificar-area-tematica',
          meta: {
            ruta_permitida: 'AreasTematicas.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarAreaTematica,
        },
        {
          path: '/bitacora-area-tematica/:id',
          name: 'bitacora-area-tematica',
          meta: {
            ruta_permitida: 'AreasTematicas.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraAreaTematica,
        },
      ],
    },
  ],
}
