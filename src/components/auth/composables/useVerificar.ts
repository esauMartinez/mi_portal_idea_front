import { useMutation } from '@tanstack/vue-query'
import { verificar } from '../services/recuperar'
import { mensajeError, mensajeOk } from '@/helper/mensajes'
import { timer } from '@/helper/timer'
import router from '@/router'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'

const useVerificar = () => {
  const verificarMutation = useMutation({
    mutationKey: ['verificar'],
    mutationFn: verificar,
    onMutate: () => {
      console.log('Verificando...')
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
    isPending: computed(() => verificarMutation.isPending.value),
    isSuccess: computed(() => verificarMutation.isSuccess.value),

    verificarMutation,
  }
}

export default useVerificar
