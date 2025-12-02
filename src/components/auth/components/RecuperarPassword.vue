<script setup lang="ts">
import { ErrorMessage, Field, useForm } from 'vee-validate'
import type { IRecuperar } from '../interfaces/recuperar'
import { schemaRecuperar } from '../helpers/schema'
import useRecuperar from '../composables/useRecuperar'
import { useRoute } from 'vue-router'

const { recuperarMutation, isPending } = useRecuperar()

const { query } = useRoute()
const token = query.token as string
const { handleSubmit } = useForm<IRecuperar>({
  initialValues: {},
  validationSchema: schemaRecuperar,
})

const submit = handleSubmit((values) => {
  values.token = token
  recuperarMutation.mutate(values)
})
</script>

<template>
  <v-card :style="{ 'min-width': '480px' }">
    <template #content>
      <div class="flex justify-center flex-col items-center mb-3 mt-3 gap-2">
        <h4 class="text-[24px]! text-black">Nueva contraseña</h4>
      </div>

      <form
        @submit="submit"
        :initial-values="{}"
        :validation-schema="schemaRecuperar"
        class="grid grid-cols-1 gap-3"
      >
        <Field name="password" v-slot="{ field, meta, errors }">
          <div>
            <label for="password">Contraseña</label>
            <v-password
              fluid
              :modelValue="field.value"
              @update:modelValue="field.onChange"
              :invalid="meta.touched && errors.length > 0"
              toggleMask
            />

            <ErrorMessage name="password" class="text-red-500" />
          </div>
        </Field>

        <Field name="verificarPassword" v-slot="{ field, meta, errors }">
          <div>
            <label for="verificarPassword">Verificar contraseña</label>
            <v-password
              fluid
              :feedback="false"
              :modelValue="field.value"
              @update:modelValue="field.onChange"
              :invalid="meta.touched && errors.length > 0"
              toggleMask
            />

            <ErrorMessage name="verificarPassword" class="text-red-500" />
          </div>
        </Field>

        <v-button
          type="submit"
          :label="'Enviar'"
          class="bg-[#283d98]! border-[#283d98]! hover:bg-[#3d54b9]! hover:border-[#3d54b9]"
          :loading="isPending"
        />
      </form>
    </template>
  </v-card>
</template>

<style scoped></style>
