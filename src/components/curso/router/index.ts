import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import CursosPage from '@/pages/CursosPage.vue'
import ListaCursos from '../ui/ListaCursos.vue'
import CrearCurso from '../ui/CrearCurso.vue'
import ModificarCurso from '../ui/ModificarCurso.vue'
import BitacoraCurso from '../ui/BitacoraCurso.vue'

export const cursoRutas = {
  path: '/cursos',
  name: 'cursos',
  redirect: { name: 'lista-cursos' },
  component: CursosPage,
  children: [
    {
      path: '/lista-cursos',
      name: 'lista-cursos',
      meta: {
        ruta_permitida: 'Cursos.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaCursos,
      children: [
        {
          path: '/crear-curso',
          name: 'crear-curso',
          meta: {
            ruta_permitida: 'Cursos.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearCurso,
        },
        {
          path: '/modificar-curso/:id',
          name: 'modificar-curso',
          meta: {
            ruta_permitida: 'Cursos.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarCurso,
        },
        {
          path: '/bitacora-curso/:id',
          name: 'bitacora-curso',
          meta: {
            ruta_permitida: 'Cursos.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraCurso,
        },
      ],
    },
  ],
}
