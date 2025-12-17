import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import PuestosPage from '@/pages/PuestosPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaPuestos from '../ui/ListaPuestos.vue'
import CrearPuesto from '../ui/CrearPuesto.vue'
import ModificarPuesto from '../ui/ModificarPuesto.vue'
import BitacoraPuesto from '../ui/BitacoraPuesto.vue'

export const puestoRutas: RouteRecordRaw = {
  path: '/puestos',
  name: 'puestos',
  component: PuestosPage,
  redirect: { name: 'lista-puestos' },
  children: [
    {
      path: '/lista-puestos',
      name: 'lista-puestos',
      meta: {
        ruta_permitida: 'Puestos.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaPuestos,
      children: [
        {
          path: '/crear-puesto',
          name: 'crear-puesto',
          meta: {
            ruta_permitida: 'Puestos.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearPuesto,
        },
        {
          path: '/modificar-puesto/:id',
          name: 'modificar-puesto',
          meta: {
            ruta_permitida: 'Puestos.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarPuesto,
        },
        {
          path: '/bitacora-puesto/:id',
          name: 'bitacora-puesto',
          meta: {
            ruta_permitida: 'Puestos.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraPuesto,
        },
      ],
    },
  ],
}
