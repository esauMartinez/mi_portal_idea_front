<script setup lang="ts">
import useAuth from '@/components/auth/composables/useAuth'
import { computed, ref } from 'vue'
import {
  verificarPermiso,
  verificarSiMostrarCapacitacion,
  verificarSiMostrarGestion,
} from '@/guards/verificarPermiso'

const { autenticado, logout } = useAuth()
const collapsed = ref<boolean>(false)

const menu = computed(() => {
  return [
    {
      title: 'Inicio',
      icon: 'pi pi-home',
      href: '/home',
    },
    {
      title: 'Mis cursos',
      icon: 'pi pi-graduation-cap',
      href: '/mis-cursos',
    },
    {
      title: 'Gestion',
      icon: 'pi pi-cog',
      hidden: !verificarSiMostrarGestion(),
      child: [
        {
          href: '/empleados',
          title: 'Empleados',
          icon: 'pi pi-users',
          hidden: !verificarPermiso('Empleados.Ver'),
        },
        {
          href: '/perfiles',
          title: 'Perfiles',
          icon: 'pi pi-address-book',
          hidden: !verificarPermiso('Perfiles.Ver'),
        },
        {
          href: '/ubicaciones',
          title: 'Ubicaciones',
          icon: 'pi pi-map-marker',
          hidden: !verificarPermiso('Ubicaciones.Ver'),
        },
        {
          href: '/departamentos',
          title: 'Departamentos',
          icon: 'pi pi-building-columns',
          hidden: !verificarPermiso('Departamentos.Ver'),
        },
        {
          href: '/empresas',
          title: 'Empresas',
          icon: 'pi pi-building',
          hidden: !verificarPermiso('Empresas.Ver'),
        },
        {
          href: '/sucursales',
          title: 'Sucursales',
          icon: 'pi pi-warehouse',
          hidden: !verificarPermiso('Sucursales.Ver'),
        },
        {
          href: '/cargos',
          title: 'Cargos',
          icon: 'pi pi-flag',
          hidden: !verificarPermiso('Cargos.Ver'),
        },
        {
          href: '/puestos',
          title: 'Puestos',
          icon: 'pi pi-hammer',
          hidden: !verificarPermiso('Puestos.Ver'),
        },
        {
          href: '/centros-costos',
          title: 'Centros de costos',
          icon: 'pi pi-dollar',
          hidden: !verificarPermiso('CentrosCostos.Ver'),
        },
        {
          href: '/ocupaciones',
          title: 'Ocupaciones especificas',
          icon: 'pi pi-briefcase',
          hidden: !verificarPermiso('Ocupaciones.Ver'),
        },
        {
          href: '/areas-tematicas',
          title: 'Areas tematicas',
          icon: 'pi pi-id-card',
          hidden: !verificarPermiso('AreasTematicas.Ver'),
        },
        {
          href: '/modelos',
          title: 'Modelos',
          icon: 'pi pi-desktop',
          hidden: !verificarPermiso('Modelos.Ver'),
        },
      ],
    },
    {
      title: 'Capacitacion',
      icon: 'pi pi-bookmark',
      hidden: !verificarSiMostrarCapacitacion(),
      child: [
        {
          href: '/cursos',
          title: 'Cursos',
          icon: 'pi pi-file-check',
          hidden: !verificarPermiso('Cursos.Ver'),
        },
        {
          href: '/clases',
          title: 'Capacitaciones',
          icon: 'pi pi-star',
          hidden: !verificarPermiso('Clases.Ver'),
        },
        {
          href: '/requerimientos',
          title: 'Requerimientos',
          icon: 'pi pi-briefcase',
          hidden: !verificarPermiso('Requerimientos.Ver'),
        },
      ],
    },
  ]
})

const onToggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <sidebar-menu
    :menu="menu"
    theme="white-theme"
    :hideToggle="false"
    v-if="autenticado"
    @update:collapsed="onToggleCollapse"
  >
    <!-- <sidebar-menu :menu="menu" :hideToggle="true" v-if="autenticado"> -->
    <template v-slot:header>
      <div class="flex justify-center">
        <img src="/logo.webp" alt="logotipo" class="w-[150px]!" />
      </div>
    </template>
    <template v-slot:footer>
      <div class="p-2 flex! justify-center items-center">
        <v-button
          :label="collapsed ? '' : 'Salir'"
          severity="danger"
          icon="pi pi-power-off"
          class="w-full"
          @click="logout"
        />
      </div>
    </template>
  </sidebar-menu>

  <div class="">
    <!-- Botón de salir -->
    <div
      :class="{
        'body-full': autenticado && !collapsed,
        'body-collapsed': collapsed,
        'pt-2': true,
      }"
    >
      <div class="mt-2">
        <RouterView />
      </div>
    </div>
  </div>

  <v-toast position="bottom-right" group="br" />
</template>

<style scoped></style>
