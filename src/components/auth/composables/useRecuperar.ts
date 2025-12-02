import { useMutation } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import { mensajeError, mensajeOk } from '@/helper/mensajes'
import { recuperar } from '../services/recuperar'
import router from '@/router'
import { timer } from '@/helper/timer'

const useRecuperar = () => {
  const recuperarMutation = useMutation({
    mutationKey: ['recuperar'],
    mutationFn: recuperar,
    onMutate: () => {
      console.log('Recuperando...')
    },
    onSuccess: async (payload: string) => {
      mensajeOk(payload)
      await timer()
      router.push('/')
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeError(data.errors[0]?.message)
    },
  })

  return {
    isPending: computed(() => recuperarMutation.isPending.value),
    isSuccess: computed(() => recuperarMutation.isSuccess.value),

    recuperarMutation,
  }
}

export default useRecuperar
