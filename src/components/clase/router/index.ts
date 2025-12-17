import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import ClasesPage from '@/pages/ClasesPage.vue'
import ListaClases from '../ui/ListaClases.vue'
import VerClase from '../ui/VerClase.vue'
import CrearClase from '../ui/CrearClase.vue'
import ModificarClase from '../ui/ModificarClase.vue'
import EnlazarClases from '../ui/EnlazarClases.vue'
import ListaClasesPadres from '../ui/ListaClasesPadres.vue'
import CalificarClase from '../ui/CalificarClase.vue'
import ArchivosClase from '../ui/ArchivosClase.vue'
import ListaInstructores from '../ui/ListaInstructores.vue'
import ListaAlumnos from '../ui/ListaAlumnos.vue'
import BitacoraClase from '../ui/BitacoraClase.vue'

export const claseRutas = {
  path: '/clases',
  name: 'clases',
  redirect: { name: 'lista-clases' },
  component: ClasesPage,
  children: [
    {
      path: '/lista-clases',
      name: 'lista-clases',
      meta: {
        ruta_permitida: 'Clases.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaClases,
      children: [
        {
          path: '/ver-clase/:id',
          name: 'ver-clase',
          meta: {
            ruta_permitida: 'Clases.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: VerClase,
        },
        {
          path: '/crear-clase',
          name: 'crear-clase',
          meta: {
            ruta_permitida: 'Clases.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearClase,
        },
        {
          path: '/modificar-clase/:id',
          name: 'modificar-clase',
          meta: {
            ruta_permitida: 'Clases.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarClase,
        },
        {
          path: '/enlazar-clases',
          name: 'enlazar-clases',
          component: EnlazarClases,
        },
        {
          path: '/enlazar-clase/:id',
          name: 'enlazar-clase',
          meta: {
            ruta_permitida: 'Clases.Enlazar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ListaClasesPadres,
        },
        {
          path: '/calificar-clase/:id',
          name: 'calificar-clase',
          meta: {
            ruta_permitida: 'Clases.Calificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: CalificarClase,
          children: [
            {
              path: '/subir-archivos-clase/:id',
              name: 'subir-archivos-clase',
              component: ArchivosClase,
            },
          ],
        },
        {
          path: '/lista-instructore/:id',
          name: 'lista-instructores',
          component: ListaInstructores,
        },
        {
          path: '/archivos-clase/:id',
          name: 'archivos-clase',
          component: ArchivosClase,
        },
        {
          path: '/lista-alumnos/:id',
          name: 'lista-alumnos',
          component: ListaAlumnos,
        },
        {
          path: '/bitacora-clase/:id',
          name: 'bitacora-clase',
          meta: {
            ruta_permitida: 'Clases.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraClase,
        },
      ],
    },
  ],
}
