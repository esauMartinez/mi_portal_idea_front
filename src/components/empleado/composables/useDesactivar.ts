import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { IErrors } from '@/interfaces/errors'
import { computed } from 'vue'
import type { IEmpleado } from '../interfaces/empleado'
import type { IBitacoraEmpleado } from '../interfaces/bitacora'
import { desactivar } from '../services/empleado'
import { mensajeError, mensajeOk, observaciones } from '@/helper/mensajes'

const useDesactivar = () => {
  const queryClient = useQueryClient()

  const desactivarMutation = useMutation({
    mutationKey: ['desactivarEmpleado'],
    mutationFn: desactivar,
    onMutate: () => {
      console.log('Desactivando...')
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

  const desactivarEmpleado = (empleado: IEmpleado) => {
    observaciones('Desactivar empleado').then((result) => {
      const bitacora = {
        evento: 'desactivar',
        descripcion: result,
        empleadoId: empleado.id,
      } as IBitacoraEmpleado
      desactivarMutation.mutate(bitacora)
    })
  }

  return {
    isPending: computed(() => desactivarMutation.isPending.value),
    isSuccess: computed(() => desactivarMutation.isSuccess.value),

    desactivarEmpleado,
  }
}

export default useDesactivar
