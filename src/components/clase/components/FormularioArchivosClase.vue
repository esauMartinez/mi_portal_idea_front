<script setup lang="ts">
import type { FileUploadUploaderEvent } from 'primevue'
import { ErrorMessage, Field } from 'vee-validate'

const archivos = (e: FileUploadUploaderEvent) => {
  console.log(e.files)
}
</script>

<template>
  <form class="grid grid-cols-1 gap-3">
    <Field name="file">
      <div>
        <v-fileupload
          name="demo[]"
          chooseLabel="Seleccionar archivo"
          cancelLabel="Cancelar"
          :showUploadButton="false"
          :showCancelButton="false"
          uploadLabel="Subir archivos"
          :multiple="true"
          accept=".xlsx"
          @select="archivos($event)"
        />
        <ErrorMessage name="file" class="text-red-500" />
      </div>
    </Field>

    <div class="flex justify-end gap-3">
      <v-button icon="pi pi-times" label="Cancelar" severity="danger" size="small" />
      <v-button icon="pi pi-save" label="Guardar" size="small" type="submit" />
    </div>
  </form>
</template>

<style scoped></style>
