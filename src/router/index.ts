import NotFound from '@/components/notfound/NotFound.vue'
import { verificarAutenticacion } from '@/guards/verificarAutenticacion'
import CursosPage from '@/pages/CursosPage.vue'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import PerfilesPage from '@/pages/PerfilesPage.vue'
import UnauthorizedPage from '@/pages/UnauthorizedPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EmpleadosPage from '@/pages/EmpleadosPage.vue'
import ListaEmpleados from '@/components/empleado/ui/ListaEmpleados.vue'
import CrearEmpleado from '@/components/empleado/ui/CrearEmpleado.vue'
import ModificarEmpleado from '@/components/empleado/ui/ModificarEmpleado.vue'
import ListaBitacoraEmpleado from '@/components/empleado/ui/ListaBitacoraEmpleado.vue'
import JerarquiaEmpleado from '@/components/empleado/ui/JerarquiaEmpleado.vue'
import ListaPerfiles from '@/components/perfil/ui/ListaPerfiles.vue'
import CrearPerfil from '@/components/perfil/ui/CrearPerfil.vue'
import ModificarPerfil from '@/components/perfil/ui/ModificarPerfil.vue'
import ListaCursos from '@/components/curso/ui/ListaCursos.vue'
import CrearCurso from '@/components/curso/ui/CrearCurso.vue'
import ModificarCurso from '@/components/curso/ui/ModificarCurso.vue'
import ClasesPage from '@/pages/ClasesPage.vue'
import ListaClases from '@/components/clase/ui/ListaClases.vue'
import CrearClase from '@/components/clase/ui/CrearClase.vue'
import ModificarClase from '@/components/clase/ui/ModificarClase.vue'
import KardexEmpleado from '@/components/empleado/ui/KardexEmpleado.vue'
import RequerimientosPage from '@/pages/RequerimientosPage.vue'
import ListaRequerimientos from '@/components/requerimiento/ui/ListaRequerimientos.vue'
import CrearRequerimiento from '@/components/requerimiento/ui/CrearRequerimiento.vue'
import ModificarRequerimiento from '@/components/requerimiento/ui/ModificarRequerimiento.vue'
import CalificarClase from '@/components/clase/ui/CalificarClase.vue'
import UbicacionPage from '@/pages/UbicacionPage.vue'
import ListaUbicaciones from '@/components/ubicacion/ui/ListaUbicaciones.vue'
import CrearUbicacion from '@/components/ubicacion/ui/CrearUbicacion.vue'
import ModificarUbicacion from '@/components/ubicacion/ui/ModificarUbicacion.vue'
import VerClase from '@/components/clase/ui/VerClase.vue'
import ListaInstructores from '@/components/clase/ui/ListaInstructores.vue'
import ListaAlumnos from '@/components/clase/ui/ListaAlumnos.vue'
import EnlazarClases from '@/components/clase/ui/EnlazarClases.vue'
import DepartamentosPage from '@/pages/DepartamentosPage.vue'
import ListaDepartamentos from '@/components/departamento/ui/ListaDepartamentos.vue'
import CrearDepartamento from '@/components/departamento/ui/CrearDepartamento.vue'
import ModificarDepartamento from '@/components/departamento/ui/ModificarDepartamento.vue'
import EmpresasPage from '@/pages/EmpresasPage.vue'
import SucursalesPage from '@/pages/SucursalesPage.vue'
import ListaEmpresas from '@/components/empresa/ui/ListaEmpresas.vue'
import CrearEmpresa from '@/components/empresa/ui/CrearEmpresa.vue'
import ModificarEmpresa from '@/components/empresa/ui/ModificarEmpresa.vue'
import ListaSucursales from '@/components/sucursal/ui/ListaSucursales.vue'
import CrearSucursal from '@/components/sucursal/ui/CrearSucursal.vue'
import ModificarSucursal from '@/components/sucursal/ui/ModificarSucursal.vue'
import BitacoraSucursal from '@/components/sucursal/ui/BitacoraSucursal.vue'
import BitacoraCurso from '@/components/curso/ui/BitacoraCurso.vue'
import BitacoraDepartamento from '@/components/departamento/ui/BitacoraDepartamento.vue'
import BitacoraUbicacion from '@/components/ubicacion/ui/BitacoraUbicacion.vue'
import BitacoraEmpresa from '@/components/empresa/ui/BitacoraEmpresa.vue'
import BitacoraRequerimiento from '@/components/requerimiento/ui/BitacoraRequerimiento.vue'
import CargosPage from '@/pages/CargosPage.vue'
import ListaCargos from '@/components/cargo/ui/ListaCargos.vue'
import CrearCargo from '@/components/cargo/ui/CrearCargo.vue'
import ModificarCargo from '@/components/cargo/ui/ModificarCargo.vue'
import BitacoraCargo from '@/components/cargo/ui/BitacoraCargo.vue'
import PuestosPage from '@/pages/PuestosPage.vue'
import ListaPuestos from '@/components/puesto/ui/ListaPuestos.vue'
import CrearPuesto from '@/components/puesto/ui/CrearPuesto.vue'
import ModificarPuesto from '@/components/puesto/ui/ModificarPuesto.vue'
import BitacoraPuesto from '../components/puesto/ui/BitacoraPuesto.vue'
import CentrosCostosPage from '@/pages/CentrosCostosPage.vue'
import ListaCentrosCostos from '@/components/centroCosto/ui/ListaCentrosCostos.vue'
import CrearCentroCosto from '@/components/centroCosto/ui/CrearCentroCosto.vue'
import ModificarCentroCosto from '@/components/centroCosto/ui/ModificarCentroCosto.vue'
import BitacoraCentroCosto from '@/components/centroCosto/ui/BitacoraCentroCosto.vue'
import MisCursosPage from '@/pages/MisCursosPage.vue'
import ListaMisCursos from '@/components/misCursos/ui/ListaMisCursos.vue'
import CursosEmpleado from '@/components/empleado/ui/CursosEmpleado.vue'
import CertificadoPDF from '@/components/misCursos/components/CertificadoPDF.vue'
import CertificadoEmpleadoPDF from '@/components/empleado/ui/CertificadoEmpleadoPDF.vue'
import ListaClasesPadres from '@/components/clase/ui/ListaClasesPadres.vue'
import ListaOcupaciones from '@/components/ocupacion/ui/ListaOcupaciones.vue'
import CrearOcupacion from '@/components/ocupacion/ui/CrearOcupacion.vue'
import ModificarOcupacion from '@/components/ocupacion/ui/ModificarOcupacion.vue'
import ListaAreasTematicas from '@/components/areaTematica/ui/ListaAreasTematicas.vue'
import CrearAreaTematica from '@/components/areaTematica/ui/CrearAreaTematica.vue'
import ModificarAreaTematica from '@/components/areaTematica/ui/ModificarAreaTematica.vue'
import AreasTematicasPage from '@/pages/AreasTematicasPage.vue'
import OcupacionesPage from '@/pages/OcupacionesPage.vue'
import ModelosPage from '@/pages/ModelosPage.vue'
import ListaModelos from '@/components/modelo/ui/ListaModelos.vue'
import CrearModelo from '@/components/modelo/ui/CrearModelo.vue'
import ModificarModelo from '@/components/modelo/ui/ModificarModelo.vue'
import OrdenesPage from '@/pages/OrdenesPage.vue'
import ListaOrdenes from '@/components/orden/ui/ListaOrdenes.vue'
import CrearOrden from '@/components/orden/ui/CrearOrden.vue'
import ModificarOrden from '@/components/orden/ui/ModificarOrden.vue'
import BitacoraOrden from '@/components/orden/ui/BitacoraOrden.vue'
import BitacoraPerfil from '@/components/perfil/ui/BitacoraPerfil.vue'
import BitacoraOcupacion from '@/components/ocupacion/ui/BitacoraOcupacion.vue'
import BitacoraAreaTematica from '@/components/areaTematica/ui/BitacoraAreaTematica.vue'
import BitacoraModelo from '@/components/modelo/ui/BitacoraModelo.vue'
import BitacoraClase from '@/components/clase/ui/BitacoraClase.vue'
import RecuperarPassworPage from '@/pages/RecuperarPassworPage.vue'
import PasswordOlvidadaPage from '@/pages/PasswordOlvidadaPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
      // beforeEnter: [verificarAutenticacion],
    },
    {
      path: '/home',
      name: 'home',
      beforeEnter: [verificarAutenticacion],
      component: HomePage,
    },
    {
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
    },
    {
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
    },
    {
      path: '/sucursales',
      name: 'sucursales',
      redirect: { name: 'lista-sucursales' },
      component: SucursalesPage,
      children: [
        {
          path: '/lista-sucursales',
          name: 'lista-sucursales',
          meta: {
            ruta_permitida: 'Sucursales.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: ListaSucursales,
          children: [
            {
              path: '/crear-sucursal',
              name: 'crear-sucursal',
              meta: {
                ruta_permitida: 'Sucursales.Crear',
              },
              beforeEnter: [verificarAutenticacion],
              component: CrearSucursal,
            },
            {
              path: '/modificar-sucursal/:id',
              name: 'modificar-sucursal',
              meta: {
                ruta_permitida: 'Sucursales.Modificar',
              },
              beforeEnter: [verificarAutenticacion],
              component: ModificarSucursal,
            },
            {
              path: '/bitacora-sucursal/:id',
              name: 'bitacora-sucursal',
              meta: {
                ruta_permitida: 'Sucursales.Bitacora',
              },
              beforeEnter: [verificarAutenticacion],
              component: BitacoraSucursal,
            },
          ],
        },
      ],
    },
    {
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
    },
    {
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
              component: ListaBitacoraEmpleado,
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
    },
    {
      path: '/ocupaciones',
      name: 'ocupaciones',
      redirect: { name: 'lista-ocupaciones' },
      component: OcupacionesPage,
      children: [
        {
          path: '/lista-ocupaciones',
          name: 'lista-ocupaciones',
          meta: {
            ruta_permitida: 'Ocupaciones.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: ListaOcupaciones,
          children: [
            {
              path: '/crear-ocupacion',
              name: 'crear-ocupacion',
              meta: {
                ruta_permitida: 'Ocupaciones.Crear',
              },
              beforeEnter: [verificarAutenticacion],
              component: CrearOcupacion,
            },
            {
              path: '/modificar-ocupacion/:id',
              name: 'modificar-ocupacion',
              meta: {
                ruta_permitida: 'Ocupaciones.Modificar',
              },
              beforeEnter: [verificarAutenticacion],
              component: ModificarOcupacion,
            },
            {
              path: '/bitacora-ocupacion/:id',
              name: 'bitacora-ocupacion',
              meta: {
                ruta_permitida: 'Ocupaciones.Bitacora',
              },
              beforeEnter: [verificarAutenticacion],
              component: BitacoraOcupacion,
            },
          ],
        },
      ],
    },
    {
      path: '/areas-tematicas',
      name: 'areas-tematicas',
      redirect: { name: 'lista-areas-tematicas' },
      component: AreasTematicasPage,
      children: [
        {
          path: '/lista-areas-tematicas',
          name: 'lista-areas-tematicas',
          meta: {
            ruta_permitida: 'AreasTematicas.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: ListaAreasTematicas,
          children: [
            {
              path: '/crear-area-tematica',
              name: 'crear-area-tematica',
              meta: {
                ruta_permitida: 'AreasTematicas.Crear',
              },
              beforeEnter: [verificarAutenticacion],
              component: CrearAreaTematica,
            },
            {
              path: '/modificar-area-tematica/:id',
              name: 'modificar-area-tematica',
              meta: {
                ruta_permitida: 'AreasTematicas.Modificar',
              },
              beforeEnter: [verificarAutenticacion],
              component: ModificarAreaTematica,
            },
            {
              path: '/bitacora-area-tematica/:id',
              name: 'bitacora-area-tematica',
              meta: {
                ruta_permitida: 'AreasTematicas.Bitacora',
              },
              beforeEnter: [verificarAutenticacion],
              component: BitacoraAreaTematica,
            },
          ],
        },
      ],
    },
    {
      path: '/cargos',
      name: 'cargos',
      redirect: { name: 'lista-cargos' },
      component: CargosPage,
      children: [
        {
          path: '/lista-cargos',
          name: 'lista-cargos',
          meta: {
            ruta_permitida: 'Cargos.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: ListaCargos,
          children: [
            {
              path: '/crear-cargo',
              name: 'crear-cargo',
              meta: {
                ruta_permitida: 'Cargos.Crear',
              },
              beforeEnter: [verificarAutenticacion],
              component: CrearCargo,
            },
            {
              path: '/modificar-cargo/:id',
              name: 'modificar-cargo',
              meta: {
                ruta_permitida: 'Cargos.Modificar',
              },
              beforeEnter: [verificarAutenticacion],
              component: ModificarCargo,
            },
            {
              path: '/bitacora-cargo/:id',
              name: 'bitacora-cargo',
              meta: {
                ruta_permitida: 'Cargos.Bitacora',
              },
              beforeEnter: [verificarAutenticacion],
              component: BitacoraCargo,
            },
          ],
        },
      ],
    },
    {
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
    },
    {
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
            },
            {
              path: '/lista-instructore/:id',
              name: 'lista-instructores',
              component: ListaInstructores,
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
    },
    {
      path: '/requerimientos',
      name: 'requerimientos',
      redirect: { name: 'lista-requerimientos' },
      component: RequerimientosPage,
      children: [
        {
          meta: {
            ruta_permitida: 'Requerimientos.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          path: '/lista-requerimientos',
          name: 'lista-requerimientos',
          component: ListaRequerimientos,
          children: [
            {
              path: '/crear-requerimiento',
              name: 'crear-requerimiento',
              meta: {
                ruta_permitida: 'Requerimientos.Crear',
              },
              beforeEnter: [verificarAutenticacion],
              component: CrearRequerimiento,
            },
            {
              path: '/modificar-requerimiento/:id',
              name: 'modificar-requerimiento',
              meta: {
                ruta_permitida: 'Requerimientos.Modificar',
              },
              beforeEnter: [verificarAutenticacion],
              component: ModificarRequerimiento,
            },
            {
              path: '/bitacora-requerimiento/:id',
              name: 'bitacora-requerimiento',
              meta: {
                ruta_permitida: 'Requerimientos.Bitacora',
              },
              beforeEnter: [verificarAutenticacion],
              component: BitacoraRequerimiento,
            },
          ],
        },
      ],
    },
    {
      path: '/ubicaciones',
      name: 'ubicaciones',
      component: UbicacionPage,
      redirect: { name: 'lista-ubicaciones' },
      children: [
        {
          path: '/lista-ubicaciones',
          name: 'lista-ubicaciones',
          meta: {
            ruta_permitida: 'Ubicaciones.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: ListaUbicaciones,
          children: [
            {
              path: '/crear-ubicacion',
              name: 'crear-ubicacion',
              meta: {
                ruta_permitida: 'Ubicaciones.Crear',
              },
              beforeEnter: [verificarAutenticacion],
              component: CrearUbicacion,
            },
            {
              path: '/modificar-ubicacion/:id',
              name: 'modificar-ubicacion',
              meta: {
                ruta_permitida: 'Ubicaciones.Modificar',
              },
              beforeEnter: [verificarAutenticacion],
              component: ModificarUbicacion,
            },
            {
              path: '/bitacora-ubicacion/:id',
              name: 'bitacora-ubicacion',
              meta: {
                ruta_permitida: 'Ubicaciones.Bitacora',
              },
              beforeEnter: [verificarAutenticacion],
              component: BitacoraUbicacion,
            },
          ],
        },
      ],
    },
    {
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
    },
    {
      path: '/puestos',
      name: 'puestos',
      component: PuestosPage,
      redirect: { name: 'lista-puestos' },
      children: [
        {
          path: '/lista-puestos',
          name: 'lista-puestos',
          meta: {
            ruta_permitida: 'Puestos.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: ListaPuestos,
          children: [
            {
              path: '/crear-puesto',
              name: 'crear-puesto',
              meta: {
                ruta_permitida: 'Puestos.Crear',
              },
              beforeEnter: [verificarAutenticacion],
              component: CrearPuesto,
            },
            {
              path: '/modificar-puesto/:id',
              name: 'modificar-puesto',
              meta: {
                ruta_permitida: 'Puestos.Modificar',
              },
              beforeEnter: [verificarAutenticacion],
              component: ModificarPuesto,
            },
            {
              path: '/bitacora-puesto/:id',
              name: 'bitacora-puesto',
              meta: {
                ruta_permitida: 'Puestos.Bitacora',
              },
              beforeEnter: [verificarAutenticacion],
              component: BitacoraPuesto,
            },
          ],
        },
      ],
    },
    {
      path: '/mis-cursos',
      name: 'mis-cursos',
      redirect: { name: 'lista-mis-cursos' },
      component: MisCursosPage,
      children: [
        {
          path: '/lista-mis-cursos',
          name: 'lista-mis-cursos',
          // meta: {
          //   ruta_permitida: 'CentrosCostos.Bitacora',
          // },
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
    },
    {
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
    },
    {
      path: '/ordenes',
      name: 'ordenes',
      redirect: { name: 'lista-ordenes' },
      component: OrdenesPage,
      children: [
        {
          path: '/lista-ordenes',
          name: 'lista-ordenes',
          meta: {
            ruta_permitida: 'Ordenes.Ver',
          },
          beforeEnter: [verificarAutenticacion],
          component: ListaOrdenes,
          children: [
            {
              path: '/crear-orden',
              name: 'crear-orden',
              meta: {
                ruta_permitida: 'Ordenes.Crear',
              },
              beforeEnter: [verificarAutenticacion],
              component: CrearOrden,
            },
            {
              path: '/modificar-orden/:id',
              name: 'modificar-orden',
              meta: {
                ruta_permitida: 'Ordenes.Modificar',
              },
              beforeEnter: [verificarAutenticacion],
              component: ModificarOrden,
            },
            {
              path: '/bitacora-orden/:id',
              name: 'bitacora-orden',
              meta: {
                ruta_permitida: 'Ordenes.Bitacora',
              },
              beforeEnter: [verificarAutenticacion],
              component: BitacoraOrden,
            },
          ],
        },
      ],
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
