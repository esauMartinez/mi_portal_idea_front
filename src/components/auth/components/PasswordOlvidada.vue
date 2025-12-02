<script setup lang="ts">
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { schemaOlvidada } from '../helpers/schema'
import useOlvidada from '../composables/useOlvidada'
import type { IOlvidada } from '../interfaces/olvidada'
import router from '@/router'

const { olvidadaMutation, isPending } = useOlvidada()

const { handleSubmit } = useForm<IOlvidada>({
  initialValues: {},
  validationSchema: schemaOlvidada,
})

const submit = handleSubmit((values) => {
  olvidadaMutation.mutate(values)
})
</script>

<template>
  <v-card :style="{ 'min-width': '480px' }">
    <template #content>
      <div class="flex justify-center flex-col items-center mb-3 mt-3 gap-2">
        <h4 class="text-[24px]! text-black">Correo de recuperacion</h4>
      </div>

      <form
        @submit="submit"
        :initial-values="{}"
        :validation-schema="schemaOlvidada"
        class="grid grid-cols-1 gap-3"
      >
        <Field name="email" v-slot="{ field, meta, errors }">
          <div>
            <label for="email">Correo</label>
            <v-inputtext
              fluid
              :modelValue="field.value"
              @update:modelValue="field.onChange"
              :invalid="meta.touched && errors.length > 0"
            />

            <ErrorMessage name="email" class="text-red-500" />
          </div>
        </Field>

        <div class="grid grid-cols-2 gap-3">
          <v-button type="button" :label="'Regresar'" severity="danger" @click="router.back()" />
          <v-button
            type="submit"
            :label="'Enviar'"
            class="bg-[#283d98]! border-[#283d98]! hover:bg-[#3d54b9]! hover:border-[#3d54b9]"
            :loading="isPending"
          />
        </div>
      </form>
    </template>
  </v-card>
</template>

<style scoped></style>
