import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import EmpresasPage from '@/pages/EmpresasPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaEmpresas from '../ui/ListaEmpresas.vue'
import CrearEmpresa from '../ui/CrearEmpresa.vue'
import ModificarEmpresa from '../ui/ModificarEmpresa.vue'
import BitacoraEmpresa from '../ui/BitacoraEmpresa.vue'

export const empresaRutas: RouteRecordRaw = {
  path: '/empresas',
  name: 'empresas',
  redirect: { name: 'lista-empresas' },
  component: EmpresasPage,
  children: [
    {
      path: '/lista-empresas',
      name: 'lista-empresas',
      meta: {
        ruta_permitida: 'Empresas.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaEmpresas,
      children: [
        {
          path: '/crear-empresa',
          name: 'crear-empresa',
          meta: {
            ruta_permitida: 'Empresas.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearEmpresa,
        },
        {
          path: '/modificar-empresa/:id',
          name: 'modificar-empresa',
          meta: {
            ruta_permitida: 'Empresas.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarEmpresa,
        },
        {
          path: '/bitacora-empresa/:id',
          name: 'bitacora-empresa',
          meta: {
            ruta_permitida: 'Empresas.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraEmpresa,
        },
      ],
    },
  ],
}
