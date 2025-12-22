import { mensajeError, mensajeOk, pregunta } from '@/helper/mensajes'
import type { IErrors } from '@/interfaces/errors'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { computed } from 'vue'
import { updateMiCurso } from '../services/pdf'
import type { IClaseEmpleado } from '@/components/clase/interfaces/clase_empleado'

const useModificarMiCurso = () => {
  const queryClient = useQueryClient()

  const modificarMutation = useMutation({
    mutationKey: ['updateMiCurso'],
    mutationFn: updateMiCurso,
    onMutate: () => {
      console.log('Modificando...')
    },
    onSuccess: (payload: string) => {
      mensajeOk(payload)

      queryClient.invalidateQueries({
        queryKey: ['getMisCursos'],
      })
      queryClient.invalidateQueries({
        queryKey: ['getCursosEmpleado'],
      })
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      mensajeError(data.errors[0]?.message)
    },
  })

  const aceptarComentarios = (payload: IClaseEmpleado) => {
    pregunta('Comentarios del instructor', `${payload.comentarios}`).then(() => {
      modificarMutation.mutate(payload)
    })
  }

  return {
    isPending: computed(() => modificarMutation.isPending.value),
    isSuccess: computed(() => modificarMutation.isSuccess.value),

    aceptarComentarios,
  }
}

export default useModificarMiCurso
