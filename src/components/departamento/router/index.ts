import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import DepartamentosPage from '@/pages/DepartamentosPage.vue'
import ListaDepartamentos from '../ui/ListaDepartamentos.vue'
import CrearDepartamento from '../ui/CrearDepartamento.vue'
import ModificarDepartamento from '../ui/ModificarDepartamento.vue'
import BitacoraDepartamento from '../ui/BitacoraDepartamento.vue'
import type { RouteRecordRaw } from 'vue-router'

export const departamentoRouter: RouteRecordRaw = {
  path: '/departamentos',
  name: 'departamentos',
  redirect: { name: 'lista-departamentos' },
  component: DepartamentosPage,
  children: [
    {
      path: '/lista-departamentos',
      name: 'lista-departamentos',
      meta: {
        ruta_permitida: 'Departamentos.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaDepartamentos,
      children: [
        {
          path: '/crear-departamento',
          name: 'crear-departamento',
          meta: {
            ruta_permitida: 'Departamentos.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearDepartamento,
        },
        {
          path: '/modificar-departamento/:id',
          name: 'modificar-departamento',
          meta: {
            ruta_permitida: 'Departamentos.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarDepartamento,
        },
        {
          path: '/bitacora-departamento/:id',
          name: 'bitacora-departamento',
          meta: {
            ruta_permitida: 'Departamentos.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraDepartamento,
        },
      ],
    },
  ],
}
