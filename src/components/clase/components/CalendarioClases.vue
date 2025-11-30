<script setup lang="ts">
import { ref, computed } from 'vue'
import useClases from '../composables/useClases'
import router from '@/router'
import type { IClase } from '../interfaces/clase'
import { parseLocalDate } from '@/helper/parseLocalDate'
import moment from 'moment'
import { verificarPermiso } from '@/guards/verificarPermiso'
import useEliminar from '../composables/useEliminar'
import useDesenlazar from '../composables/useDesenlazar'

const { data: clases, inicio, fin, colorClase, isLoading } = useClases()
const { eliminar } = useEliminar()
const { desenlazar } = useDesenlazar()
const today = new Date()
const view = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const selectedDate = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()))

const menuItems = (clase: IClase) => {
  let items = [
    {
      label: 'Instructores',
      icon: 'pi pi-user-plus',
      command: () => {
        router.push({ name: 'lista-instructores', params: { id: clase.id } })
      },
    },
    {
      label: 'Empleados',
      icon: 'pi pi-users',
      command: () => {
        router.push({ name: 'lista-alumnos', params: { id: clase.id } })
      },
    },
    {
      label: 'Modificar',
      icon: 'pi pi-pencil',
      command: () => {
        router.push({ name: 'modificar-clase', params: { id: clase.id } })
      },
    },
    {
      label: 'Ver clase',
      icon: 'pi pi-eye',
      command: () => {
        router.push({ name: 'ver-clase', params: { id: clase.id } })
      },
    },
    {
      label: 'Enlazar',
      icon: 'pi pi-arrow-down-left-and-arrow-up-right-to-center',
      command: () => {
        router.push({ name: 'enlazar-clase', params: { id: clase.id } })
      },
    },
    {
      label: 'Desenlazar',
      icon: 'pi pi-arrow-down-left-and-arrow-up-right-to-center',
      command: () => {
        desenlazar(clase.id)
      },
    },
    {
      label: clase.calificada ? 'Ver calificaciones' : 'Subir calificaciones',
      icon: 'pi pi-check',
      command: () => {
        router.push({ name: 'calificar-clase', params: { id: clase.id } })
      },
    },
    {
      label: 'Ver bitacora',
      icon: 'pi pi-list',
      command: () => {
        router.push({ name: 'bitacora-clase', params: { id: clase.id } })
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-times',
      command: () => {
        eliminar(clase)
      },
    },
  ]

  if (!verificarPermiso('Clases.Modificar')) {
    items = items.filter((item) => item.label !== 'Modificar')
  }

  if (clase.estatus?.toLowerCase() !== 'finalizada') {
    items = items.filter((item) => item.label !== 'Subir calificaciones')
  }

  if (clase.estatus?.toLowerCase() === 'finalizada') {
    items = items.filter((item) => item.label !== 'Eliminar')
    items = items.filter((item) => item.label !== 'Modificar')
  }

  if (clase.estatus?.toLowerCase() === 'en curso') {
    items = items.filter((item) => item.label !== 'Eliminar')
    items = items.filter((item) => item.label !== 'Modificar')
  }

  if (clase.padres.length > 0) {
    // items = items.filter((item) => item.label !== 'Modificar')
    // items = items.filter((item) => item.label !== 'Instructores')
    // items = items.filter((item) => item.label !== 'Empleados')
  }

  if (
    clase.enlazada ||
    clase.estatus?.toLowerCase() === 'en curso' ||
    clase.estatus?.toLowerCase() === 'finalizada'
  ) {
    items = items.filter((item) => item.label !== 'Enlazar')
  }

  if (
    !clase.enlazada ||
    clase.estatus?.toLowerCase() === 'en curso' ||
    clase.estatus?.toLowerCase() === 'finalizada'
  ) {
    items = items.filter((item) => item.label !== 'Desenlazar')
  }

  if (!verificarPermiso('Clases.Enlazar')) {
    items = items.filter((item) => item.label !== 'Enlazar')
  }

  if (!verificarPermiso('Clases.Bitacora')) {
    items = items.filter((item) => item.label !== 'Ver bitacora')
  }

  if (!verificarPermiso('Clases.Desenlazar')) {
    items = items.filter((item) => item.label !== 'Desenlazar')
  }

  return items
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function addMonths(d: Date, n: number) {
  const date = new Date(d.getFullYear(), d.getMonth() + n, 1)
  inicio.value = moment(date).format('YYYY-MM-DD')
  fin.value = moment(date).add(1, 'month').endOf('month').format('YYYY-MM-DD')
  return date
}

function isoDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const monthTitle = computed(() => {
  return view.value.toLocaleString(undefined, { month: 'long', year: 'numeric' })
})

function isPastDate(d: Date): boolean {
  const dateToCheck = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return dateToCheck < todayDate
}

// 🔥 CAMBIO PRINCIPAL: Ahora guarda un array de clases por fecha
const clasesPorFecha = computed(() => {
  if (!clases.value) return new Map<string, IClase[]>()

  const mapa = new Map<string, IClase[]>()

  clases.value.forEach((clase) => {
    const fecha = parseLocalDate(clase.fechaInicio)
    const key = isoDate(fecha)

    // Si ya existe la fecha, agregamos la clase al array
    if (mapa.has(key)) {
      mapa.get(key)!.push(clase)
    } else {
      // Si no existe, creamos un nuevo array con la clase
      mapa.set(key, [clase])
    }
  })

  return mapa
})

const calendarDays = computed(() => {
  const start = startOfMonth(view.value)
  const jsFirst = start.getDay()
  const mondayIndex = (jsFirst + 6) % 7
  const days: Array<{
    date: Date
    otherMonth: boolean
    isToday: boolean
    isPast: boolean
    key: string
    clases: IClase[]
  }> = []

  const firstDayToShow = new Date(start)
  firstDayToShow.setDate(start.getDate() - mondayIndex)

  for (let i = 0; i < 42; i++) {
    const d = new Date(firstDayToShow)
    d.setDate(firstDayToShow.getDate() + i)
    const otherMonth = d.getMonth() !== view.value.getMonth()
    const isToday = isoDate(d) === isoDate(today)
    const isPast = isPastDate(d)
    const clases = clasesPorFecha.value.get(isoDate(d)) ?? [] // 🔥 Array vacío por defecto

    days.push({
      date: d,
      otherMonth,
      isToday,
      isPast,
      key: `${isoDate(d)}-${i}`,
      clases, // 🔥 Array de clases
    })
  }

  return days
})

function prevMonth() {
  view.value = addMonths(view.value, -1)
}

function nextMonth() {
  view.value = addMonths(view.value, 1)
}

function goToday() {
  view.value = new Date(today.getFullYear(), today.getMonth(), 1)
  selectedDate.value = new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

function isSelected(d: Date) {
  return isoDate(d) === isoDate(selectedDate.value)
}
</script>

<template>
  <div class="w-full mx-auto font-sans relative">
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center absolute top-0 right-0 bottom-0 left-0 z-1001 bg-black/30 rounded-lg"
    >
      <v-progressspinner />
      <span class="text-3xl! text-white">Cargando datos...</span>
    </div>
    <header
      class="flex items-center justify-between bg-white border border-neutral-200 shadow-card rounded-lg px-4 py-3 mb-1"
    >
      <div class="flex items-center gap-3">
        <button
          @click="prevMonth"
          class="p-2 rounded-full hover:bg-primary-100 text-neutral-600 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          title="Mes anterior"
        >
          ‹
        </button>
        <div class="text-lg font-semibold capitalize text-gray-800">
          {{ monthTitle }}
        </div>
        <button
          @click="nextMonth"
          class="p-2 rounded-full hover:bg-primary-100 text-neutral-600 hover:text-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          title="Mes siguiente"
        >
          ›
        </button>
      </div>
      <div class="flex gap-3">
        <v-button @click="goToday" icon="pi pi-replay" label="Hoy" size="small" />
        <router-link :to="{ name: 'enlazar-clases' }" v-if="verificarPermiso('Clases.Enlazar')">
          <v-button icon="pi pi-arrow-right-arrow-left" label="Enlazar clases" size="small" />
        </router-link>
        <router-link :to="{ name: 'crear-clase' }" v-if="verificarPermiso('Clases.Crear')">
          <v-button icon="pi pi-plus" label="Crear clases" size="small" />
        </router-link>
      </div>
    </header>

    <div class="grid grid-cols-7 text-center text-sm text-neutral-600 mt-1">
      <div v-for="d in weekdays" :key="d" class="py-2 font-medium">{{ d }}</div>
    </div>

    <div
      class="grid grid-cols-7 gap-px bg-neutral-200 border border-neutral-200 rounded-xl overflow-hidden"
    >
      <!-- @click="verificarPermiso('Clases.Crear') ? selectDay(day.date) : ''" -->
      <div
        v-for="day in calendarDays"
        :key="day.key"
        :class="[
          'relative min-h-35 max-h-60 overflow-auto bg-white transition-all duration-150 p-2 flex flex-col rounded-none',
          day.otherMonth ? 'text-neutral-400' : 'text-neutral-800',
          isSelected(day.date) ? 'ring-2 ring-[#0059ff]' : '',
          day.isPast
            ? 'opacity-40 cursor-not-allowed bg-neutral-50'
            : 'cursor-pointer hover:bg-primary-50',
        ]"
      >
        <div class="text-[5px]! font-semibold mb-1" :class="day.isToday ? 'text-primary-600' : ''">
          <v-badge
            :value="day.date.getDate()"
            size="large"
            severity="contrast"
            class="rounded-full! h-[25px]! w-[25px]!"
          />
        </div>

        <!-- 🔥 Iteramos sobre todas las clases del día -->
        <div v-if="day.clases.length > 0">
          <div v-for="clase in day.clases" :key="clase.id" class="mt-1!">
            <div class="rounded-md mt-2">
              <span class="text-[12px]! p-2! bg-orange-400! text-white rounded-tl-md rounded-tr-md">
                <span>Id: {{ clase.id }} - </span>
                <span v-if="clase.enlazada">
                  {{ !clase.padres[0]?.padreId ? '' : `${clase.padres[0]?.padreId} - ` }}
                </span>
                <span>{{ clase.horaInicio }} - </span>
                <span>{{ clase.horaFinalizacion }} </span>
              </span>
            </div>
            <!-- <router-link to="" @click.stop> -->
            <v-splitbutton
              fluid
              dropdownIcon="pi pi-cog"
              :model="menuItems(clase)"
              :label="`${clase.curso.nombre.substring(0, 10)}`"
              :severity="colorClase(clase.estatus)"
              v-tooltip="clase.curso.nombre"
              size="small"
            />

            <!-- </router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
