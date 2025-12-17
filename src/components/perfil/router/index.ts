import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import PerfilesPage from '@/pages/PerfilesPage.vue'
import type { RouteRecordRaw } from 'vue-router'
import ListaPerfiles from '../ui/ListaPerfiles.vue'
import CrearPerfil from '../ui/CrearPerfil.vue'
import ModificarPerfil from '../ui/ModificarPerfil.vue'
import BitacoraPerfil from '../ui/BitacoraPerfil.vue'

export const perfilRutas: RouteRecordRaw = {
  path: '/perfiles',
  name: 'perfiles',
  redirect: { name: 'lista-perfiles' },
  component: PerfilesPage,
  children: [
    {
      path: '/lista-perfiles',
      name: 'lista-perfiles',
      meta: {
        ruta_permitida: 'Perfiles.Ver',
      },
      beforeEnter: [verificarAutenticacion],
      component: ListaPerfiles,
      children: [
        {
          path: '/crear-perfil',
          name: 'crear-perfil',
          meta: {
            ruta_permitida: 'Perfiles.Crear',
          },
          beforeEnter: [verificarAutenticacion],
          component: CrearPerfil,
        },
        {
          path: '/modificar-perfil/:id',
          name: 'modificar-perfil',
          meta: {
            ruta_permitida: 'Perfiles.Modificar',
          },
          beforeEnter: [verificarAutenticacion],
          component: ModificarPerfil,
        },
        {
          path: '/bitacora-perfil/:id',
          name: 'bitacora-perfil',
          meta: {
            ruta_permitida: 'Perfiles.Bitacora',
          },
          beforeEnter: [verificarAutenticacion],
          component: BitacoraPerfil,
        },
      ],
    },
  ],
}
