import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const autenticado = ref<boolean>(false)
  const nombreEmpleado = ref<string | null>(null)

  return {
    autenticado,
    nombreEmpleado,

    setAutenticado(payload: boolean) {
      autenticado.value = payload
    },
    setNombreEmpleado(payload: string) {
      nombreEmpleado.value = payload
    },
  }
})
