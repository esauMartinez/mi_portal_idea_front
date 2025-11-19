<script setup lang="ts">
import { computed } from 'vue'
import { schema } from '../helpers/schema'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import useAuth from '../composables/useAuth'
import type { IAuth } from '../interfaces/auth'

const { authMutation, isPending } = useAuth()

const initialValues = computed(() => {
  return { ...schema.getDefault() }
})

const { handleSubmit } = useForm<IAuth>({
  initialValues: initialValues.value,
  validationSchema: schema,
})

const submit = handleSubmit((values) => {
  authMutation.mutate(values)
})
</script>

<template>
  <div class="flex justify-center items-center h-[100vh]!">
    <v-card :style="{ 'min-width': '480px' }">
      <template #content>
        <div class="flex justify-center flex-col items-center mb-10 mt-10 gap-2">
          <h1 class="text-4xl! font-bold">Bienvenido de nuevo</h1>
          <h4 class="text-[16px]! text-gray-400">Inicia sesion para acceder a tu cuenta</h4>
        </div>

        <form
          @submit="submit"
          :initial-values="initialValues"
          :schema-validation="schema"
          class="grid grid-cols-1 gap-3"
        >
          <Field name="email" v-slot="{ field, meta, errors }">
            <div class="grid grid-cols-1">
              <label for="email" class="text-lg!">Usuario</label>
              <v-inputtext
                :modelValue="field.value"
                @update:modelValue="field.onChange"
                :invalid="meta.touched && errors.length > 0"
              />
              <ErrorMessage name="email" class="text-red-500 text-lg" />
            </div>
          </Field>

          <Field name="password" v-slot="{ field, meta, errors }">
            <div class="grid grid-cols-1">
              <label for="password" class="text-lg!">Contraseña</label>
              <v-password
                fluid
                :modelValue="field.value"
                @update:modelValue="field.onChange"
                :invalid="meta.touched && errors.length > 0"
                :feedback="false"
                toggleMask
              />
              <ErrorMessage name="password" class="text-red-500 text-lg" />
            </div>
          </Field>

          <div class="flex justify-end mt-3 mb-3">
            <RouterLink to="restaurar" class="text-[16px]! text-[#0059ff] hover:text-[#0059ffe1]">
              ¿Olvidaste tu contraseña?
            </RouterLink>
          </div>

          <v-button
            type="submit"
            :label="isPending ? 'Verificando usuario' : 'Ingresar'"
            class="bg-[#283d98]! border-[#283d98]! hover:bg-[#3d54b9]! hover:border-[#3d54b9]"
            :loading="isPending"
          />
        </form>
      </template>
    </v-card>
  </div>
</template>

<style scoped></style>
