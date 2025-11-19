export const nombreEmpleado = async () => {
  const storage = localStorage.getItem('empleado')
  if (storage === null) {
    return ''
  }

  const user_data = JSON.parse(storage || '')
  return `${user_data.data.primerNombre} ${user_data.data.segundoNombre} ${user_data.data.apellidoPaterno} ${user_data.data.apellidoMaterno}`
}
