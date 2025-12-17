import NotFound from '@/components/notfound/NotFound.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import UnauthorizedPage from '@/pages/UnauthorizedPage.vue'
import RecuperarPassworPage from '@/pages/RecuperarPassworPage.vue'
import PasswordOlvidadaPage from '@/pages/PasswordOlvidadaPage.vue'
import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import { areaTemaricaRutas } from '@/components/areaTematica/router'
import { cargoRutas } from '@/components/cargo/router'
import { centroCostosRutas } from '@/components/centroCosto/router'
import { claseRutas } from '@/components/clase/router'
import { cursoRutas } from '@/components/curso/router'
import { departamentoRouter } from '@/components/departamento/router'
import { empleadoRutas } from '@/components/empleado/router'
import { empresaRutas } from '@/components/empresa/router'
import { misCursosRutas } from '@/components/misCursos/router'
import { modeloRutas } from '@/components/modelo/router'
import { ocupacionRutas } from '@/components/ocupacion/router'
import { ordenRutas } from '@/components/orden/router'
import { perfilRutas } from '@/components/perfil/router'
import { puestoRutas } from '@/components/puesto/router'
import { requerimientoRutas } from '@/components/requerimiento/router'
import { sucursalRutas } from '@/components/sucursal/router'
import { ubicacionRutas } from '@/components/ubicacion/router'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: [verificarAutenticacion],
      component: HomePage,
    },
    {
      ...areaTemaricaRutas,
      path: '/areas-tematicas',
    },
    {
      ...cargoRutas,
      path: '/cargos',
    },
    {
      ...centroCostosRutas,
      path: '/centros-costos',
    },
    {
      ...claseRutas,
      path: '/clases',
    },
    {
      ...cursoRutas,
      path: '/cursos',
    },
    {
      ...departamentoRouter,
      path: '/departamentos',
    },
    {
      ...empleadoRutas,
      path: '/empleados',
    },
    {
      ...empresaRutas,
      path: '/empresas',
    },
    {
      ...misCursosRutas,
      path: '/mis-cursos',
    },
    {
      ...modeloRutas,
      path: '/modelos',
    },
    {
      ...ocupacionRutas,
      path: '/ocupaciones',
    },
    {
      ...ordenRutas,
      path: '/ordenes',
    },
    {
      ...perfilRutas,
      path: '/perfiles',
    },
    {
      ...puestoRutas,
      path: '/puestos',
    },
    {
      ...requerimientoRutas,
      path: '/requerimientos',
    },
    {
      ...sucursalRutas,
      path: '/sucursales',
    },
    {
      ...ubicacionRutas,
      path: '/ubicaciones',
    },
    {
      path: '/password-olvidada',
      name: 'password-olvidada',
      component: PasswordOlvidadaPage,
    },
    {
      path: '/recuperar-password',
      name: 'recuperar-password',
      component: RecuperarPassworPage,
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedPage,
      beforeEnter: [verificarAutenticacion],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      redirect: { name: 'notFound' },
      component: NotFoundPage,
      beforeEnter: [verificarAutenticacion],
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'notFound',
          component: NotFound,
        },
      ],
    },
  ],
})

export default router
