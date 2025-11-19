import { useMutation } from '@tanstack/vue-query'
import { auth } from '../services/auth'
import type { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue'
import type { IErrors } from '@/interfaces/errors'
import router from '@/router'
import type { IAuthResponse } from '../interfaces/authResponse'
import { computed } from 'vue'
import { pregunta } from '@/helper/mensajes'

const useAuth = () => {
  const authStore = useAuthStore()
  const { autenticado } = storeToRefs(authStore)
  const toast = useToast()

  const authMutation = useMutation({
    mutationKey: ['auth'],
    mutationFn: auth,
    onMutate: () => {
      toast.add({
        severity: 'info',
        summary: 'Accediendo',
        detail: 'Accediendo',
        group: 'br',
        life: 3000,
      })
    },
    onSuccess: (payload: IAuthResponse) => {
      toast.add({
        severity: 'success',
        summary: 'Acceso',
        detail: 'Acceso autorizado',
        group: 'br',
        life: 3000,
      })
      localStorage.setItem('empleado', JSON.stringify(payload))
      router.push('/home')
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as IErrors
      toast.add({
        severity: 'error',
        summary: 'Error de acceso',
        detail: data.errors[0]?.message,
        group: 'br',
        life: 3000,
      })
    },
  })

  const logout = () => {
    pregunta('Saldras del sistema', 'Estas seguro ?').then(() => {
      localStorage.removeItem('empleado')
      authStore.setAutenticado(false)
      router.push('/')
    })
  }

  return {
    autenticado,

    isPending: computed(() => authMutation.isPending.value),

    authMutation,
    logout,
  }
}

export default useAuth
