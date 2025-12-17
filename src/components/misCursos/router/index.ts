import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import MisCursosPage from '@/pages/MisCursosPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaMisCursos from '../ui/ListaMisCursos.vue'
import CertificadoPDF from '../components/CertificadoPDF.vue'

export const misCursosRutas: RouteRecordRaw = {
  path: '/mis-cursos',
  name: 'mis-cursos',
  redirect: { name: 'lista-mis-cursos' },
  component: MisCursosPage,
  children: [
    {
      path: '/lista-mis-cursos',
      name: 'lista-mis-cursos',
      beforeEnter: [verificarAutenticacion],
      component: ListaMisCursos,
      children: [
        {
          path: '/certificado-pdf/:id',
          name: 'certificado-pdf',
          component: CertificadoPDF,
        },
      ],
    },
  ],
}
