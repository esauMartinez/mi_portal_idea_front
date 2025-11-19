import { ref } from 'vue'

const useDatos = () => {
  const estatus = ref([
    { item: 'Activo', value: true },
    { item: 'Inactivo', value: false },
  ])

  return {
    estatus,
  }
}

export default useDatos
