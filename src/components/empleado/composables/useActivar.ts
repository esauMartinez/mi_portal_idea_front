import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import type { IEmpleado } from '../interfaces/empleado'
import { activar } from '../services/empleado'
import { mensajeError, mensajeOk, pregunta } from '@/helper/mensajes'

const useActivar = () => {
  const queryClient = useQueryClient()

  const activarMutation = useMutation({
    mutationKey: ['activarEmpleado'],
    mutationFn: activar,
    onMutate: () => {
      console.log('Activando...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)
      queryClient.invalidateQueries({
        queryKey: ['getEmpleados'],
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeError(data.errors[0]?.message)
    },
  })

  const activarUsuario = (empleado: IEmpleado) => {
    pregunta('Activar usuario', 'El usuario pasara a un estatus activo').then(() =>
      activarMutation.mutate(empleado),
    )
  }

  return {
    isPending: computed(() => activarMutation.isPending.value),
    isSuccess: computed(() => activarMutation.isSuccess.value),

    activarUsuario,
  }
}

export default useActivar
