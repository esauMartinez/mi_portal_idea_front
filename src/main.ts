import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueSidebarMenu from 'vue-sidebar-menu'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import 'primeicons/primeicons.css'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import {
  FaUsers,
  FaUserGraduate,
  FaAddressBook,
  FaBook,
  RiShutDownLine,
  FaHome,
  FaExclamationTriangle,
  FaAddressCard,
  FaBriefcase,
  FaMapMarkerAlt,
  FaBuilding,
  FaWarehouse,
  FaMapMarkedAlt,
  FaRegularNewspaper,
  FaHardHat,
  FaBarcode,
  FaAngleRight,
  FaAngleLeft,
  FaFileExcel,
  FaFileWord,
  FaFilePdf,
} from 'oh-vue-icons/icons'
import 'animate.css'

import {
  AutoComplete,
  Badge,
  Button,
  Card,
  Checkbox,
  Column,
  ConfirmationService,
  ConfirmDialog,
  DataTable,
  DatePicker,
  Dialog,
  Drawer,
  Fieldset,
  FileUpload,
  FloatLabel,
  IconField,
  InputIcon,
  InputNumber,
  InputText,
  Menubar,
  MultiSelect,
  OrganizationChart,
  Password,
  Popover,
  ProgressSpinner,
  Ripple,
  ScrollPanel,
  Select,
  Skeleton,
  SplitButton,
  StyleClass,
  Tag,
  Textarea,
  Toast,
  ToastService,
  ToggleSwitch,
  Tooltip,
} from 'primevue'

import App from './App.vue'
import router from './router'

addIcons(
  FaUsers,
  FaUserGraduate,
  FaAddressBook,
  FaBook,
  FaHome,
  RiShutDownLine,
  FaExclamationTriangle,
  FaAddressCard,
  FaBriefcase,
  FaMapMarkerAlt,
  FaBuilding,
  FaWarehouse,
  FaMapMarkedAlt,
  FaRegularNewspaper,
  FaHardHat,
  FaBarcode,
  FaAngleRight,
  FaAngleLeft,
  FaFileExcel,
  FaFileWord,
  FaFilePdf,
)

// Definir preset personalizado con colores primarios
const MiTemaPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '#0059ff', // Tu color primario principal
      600: '#2563eb',
      700: '#1d4ed8',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
  },
})

const app = createApp(App)

app.use(VueSidebarMenu)

app.use(PrimeVue, {
  theme: {
    preset: MiTemaPreset,
    options: {
      prefix: 'my',
      darkModeSelector: 'white',
      cssLayer: false,
    },
  },
})
app.use(Particles, {
  init: async (engine) => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadSlim(engine) // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
  },
})

app.directive('tooltip', Tooltip)
app.directive('styleclass', StyleClass)
app.directive('ripple', Ripple)

VueQueryPlugin.install(app, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        gcTime: 0,
        refetchOnWindowFocus: false,
        retry: 2,
      },
    },
  },
})

app.use(ToastService)
app.use(ConfirmationService)

app.component('v-icon', OhVueIcon)
app.component('v-toast', Toast)
app.component('v-card', Card)
app.component('v-button', Button)
app.component('v-password', Password)
app.component('v-datatable', DataTable)
app.component('v-column', Column)
app.component('v-drawer', Drawer)
app.component('v-dialog', Dialog)
app.component('v-inputtext', InputText)
app.component('v-datepicker', DatePicker)
app.component('v-select', Select)
app.component('v-skeleton', Skeleton)
app.component('v-textarea', Textarea)
app.component('v-confirmdialog', ConfirmDialog)
app.component('v-tag', Tag)
app.component('v-menubar', Menubar)
app.component('v-progressspinner', ProgressSpinner)
app.component('v-organizationchart', OrganizationChart)
app.component('v-multiselect', MultiSelect)
app.component('v-autocomplete', AutoComplete)
app.component('v-fieldset', Fieldset)
app.component('v-toggleswitch', ToggleSwitch)
app.component('v-inputnumber', InputNumber)
app.component('v-splitbutton', SplitButton)
app.component('v-checkbox', Checkbox)
app.component('v-iconfield', IconField)
app.component('v-inputicon', InputIcon)
app.component('v-badge', Badge)
app.component('v-scrollpanel', ScrollPanel)
app.component('v-popover', Popover)
app.component('v-floatlabel', FloatLabel)
app.component('v-fileupload', FileUpload)

app.use(createPinia())

app.use(router)

app.mount('#app')
