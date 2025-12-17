import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import CargosPage from '@/pages/CargosPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaCargos from '../ui/ListaCargos.vue'
import CrearCargo from '../ui/CrearCargo.vue'
import ModificarCargo from '../ui/ModificarCargo.vue'
import BitacoraCargo from '../ui/BitacoraCargo.vue'

export const cargoRutas: RouteRecordRaw = {
  path: '/cargos',
  name: 'cargos',
  redirect: { name: 'lista-cargos' },
  component: CargosPage,
  children: [
    {
      path: '/lista-cargos',
      name: 'lista-cargos',
      meta: {
        ruta_permitida: 'Cargos.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaCargos,
      children: [
        {
          path: '/crear-cargo',
          name: 'crear-cargo',
          meta: {
            ruta_permitida: 'Cargos.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearCargo,
        },
        {
          path: '/modificar-cargo/:id',
          name: 'modificar-cargo',
          meta: {
            ruta_permitida: 'Cargos.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarCargo,
        },
        {
          path: '/bitacora-cargo/:id',
          name: 'bitacora-cargo',
          meta: {
            ruta_permitida: 'Cargos.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraCargo,
        },
      ],
    },
  ],
}
