import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import OcupacionesPage from '@/pages/OcupacionesPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaOcupaciones from '../ui/ListaOcupaciones.vue'
import CrearOcupacion from '../ui/CrearOcupacion.vue'
import ModificarOcupacion from '../ui/ModificarOcupacion.vue'
import BitacoraOcupacion from '../ui/BitacoraOcupacion.vue'

export const ocupacionRutas: RouteRecordRaw = {
  path: '/ocupaciones',
  name: 'ocupaciones',
  redirect: { name: 'lista-ocupaciones' },
  component: OcupacionesPage,
  children: [
    {
      path: '/lista-ocupaciones',
      name: 'lista-ocupaciones',
      meta: {
        ruta_permitida: 'Ocupaciones.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaOcupaciones,
      children: [
        {
          path: '/crear-ocupacion',
          name: 'crear-ocupacion',
          meta: {
            ruta_permitida: 'Ocupaciones.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearOcupacion,
        },
        {
          path: '/modificar-ocupacion/:id',
          name: 'modificar-ocupacion',
          meta: {
            ruta_permitida: 'Ocupaciones.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarOcupacion,
        },
        {
          path: '/bitacora-ocupacion/:id',
          name: 'bitacora-ocupacion',
          meta: {
            ruta_permitida: 'Ocupaciones.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraOcupacion,
        },
      ],
    },
  ],
}
