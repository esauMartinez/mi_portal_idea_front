import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import EmpleadosPage from '@/pages/EmpleadosPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaEmpleados from '../ui/ListaEmpleados.vue'
import CrearEmpleado from '../ui/CrearEmpleado.vue'
import ModificarEmpleado from '../ui/ModificarEmpleado.vue'
import JerarquiaEmpleado from '../ui/JerarquiaEmpleado.vue'
import KardexEmpleado from '../ui/KardexEmpleado.vue'
import CursosEmpleado from '../ui/CursosEmpleado.vue'
import CertificadoEmpleadoPDF from '../ui/CertificadoEmpleadoPDF.vue'
import BitacoraEmpleado from '@/components/empleado/ui/BitacoraEmpleado.vue'

export const empleadoRutas: RouteRecordRaw = {
  path: '/empleados',
  name: 'empleados',
  redirect: { name: 'lista-empleados' },
  component: EmpleadosPage,
  children: [
    {
      path: '/lista-empleados',
      name: 'lista-empleados',
      meta: {
        ruta_permitida: 'Empleados.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaEmpleados,
      children: [
        {
          path: '/crear-empleado',
          name: 'crear-empleado',
          meta: {
            ruta_permitida: 'Empleados.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearEmpleado,
        },
        {
          path: '/modificar-empleado/:id',
          name: 'modificar-empleado',
          meta: {
            ruta_permitida: 'Empleados.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarEmpleado,
        },
        {
          path: '/bitacora-empleado/:id',
          name: 'bitacora-empleado',
          component: BitacoraEmpleado,
        },
        {
          path: '/jerarquia/:id',
          name: 'jerarquia',
          component: JerarquiaEmpleado,
        },
        {
          path: '/kardex/:id',
          name: 'kardex',
          meta: {
            ruta_permitida: 'Empleados.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: KardexEmpleado,
        },
        {
          path: '/cursos-empleado/:id',
          name: 'cursos-empleado',
          meta: {
            ruta_permitida: 'Empleados.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: CursosEmpleado,
          children: [
            {
              path: '/certificado-empleado-pdf/:id',
              name: 'certificado-empleado-pdf',
              component: CertificadoEmpleadoPDF,
            },
          ],
        },
      ],
    },
  ],
}
