<script setup lang="ts">
import router from '@/router'

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import usePdfCertificado from '../composables/usePdfCertificado'

const { params } = useRoute()
const visible = ref<boolean>(true)

const { id, pdfUrl, isLoading, descargarPdf } = usePdfCertificado()
id.value = +params.id!

onMounted(() => {})
</script>

<template>
  <v-dialog
    maximizable
    modal
    v-model:visible="visible"
    :style="{ width: isLoading ? '20%' : '80%' }"
    v-on:after-hide="router.back()"
    :header="isLoading ? 'Cargando...' : 'Certificado DC-3'"
  >
    <div class="flex flex-col items-center justify-center" v-if="isLoading">
      <v-progressspinner />
      <span class="text-2xl! mt-5!">Cargando...</span>
    </div>

    <div class="dialog-content" v-else>
      <iframe v-if="pdfUrl" :src="pdfUrl" class="pdf-iframe"></iframe>
      <div class="flex justify-end">
        <v-button
          @click="descargarPdf"
          :disabled="isLoading"
          severity="danger"
          icon="pi pi-download"
          label="Descargar PDF"
          iconPos="right"
        />
      </div>
    </div>
  </v-dialog>
</template>

<style scoped>
.dialog-content {
  width: 100%;
  height: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  flex: 1;
  border: none;
}
</style>
