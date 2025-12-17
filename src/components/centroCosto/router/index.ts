import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import CentrosCostosPage from '@/pages/CentrosCostosPage.vue'
import ListaCentrosCostos from '../ui/ListaCentrosCostos.vue'
import CrearCentroCosto from '../ui/CrearCentroCosto.vue'
import ModificarCentroCosto from '../ui/ModificarCentroCosto.vue'
import BitacoraCentroCosto from '../ui/BitacoraCentroCosto.vue'

export const centroCostosRutas = {
  path: '/centros-costos',
  name: 'centros-costos',
  component: CentrosCostosPage,
  redirect: { name: 'lista-centros-costos' },
  children: [
    {
      path: '/lista-centros-costos',
      name: 'lista-centros-costos',
      meta: {
        ruta_permitida: 'CentrosCostos.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaCentrosCostos,
      children: [
        {
          path: '/crear-centro-costo',
          name: 'crear-centro-costo',
          meta: {
            ruta_permitida: 'CentrosCostos.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearCentroCosto,
        },
        {
          path: '/modificar-centro-costo/:id',
          name: 'modificar-centro-costo',
          meta: {
            ruta_permitida: 'CentrosCostos.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarCentroCosto,
        },
        {
          path: '/bitacora-centro-costo/:id',
          name: 'bitacora-centro-costo',
          meta: {
            ruta_permitida: 'CentrosCostos.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraCentroCosto,
        },
      ],
    },
  ],
}
