import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import ModelosPage from '@/pages/ModelosPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaModelos from '../ui/ListaModelos.vue'
import CrearModelo from '../ui/CrearModelo.vue'
import ModificarModelo from '../ui/ModificarModelo.vue'
import BitacoraModelo from '../ui/BitacoraModelo.vue'

export const modeloRutas: RouteRecordRaw = {
  path: '/modelos',
  name: 'modelos',
  redirect: { name: 'lista-modelos' },
  component: ModelosPage,
  children: [
    {
      path: '/lista-modelos',
      name: 'lista-modelos',
      meta: {
        ruta_permitida: 'Modelos.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaModelos,
      children: [
        {
          path: '/crear-modelo',
          name: 'crear-modelo',
          meta: {
            ruta_permitida: 'Modelos.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearModelo,
        },
        {
          path: '/modificar-modelo/:id',
          name: 'modificar-modelo',
          meta: {
            ruta_permitida: 'Modelos.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarModelo,
        },
        {
          path: '/bitacora-modelo/:id',
          name: 'bitacora-modelo',
          meta: {
            ruta_permitida: 'Modelos.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraModelo,
        },
      ],
    },
  ],
}
