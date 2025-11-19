import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClaseStore = defineStore('clase', () => {
  const fechaClase = ref<Date | null>()

  return {
    fechaClase,

    setFecha(payload: Date) {
      fechaClase.value = payload
    },
  }
})
