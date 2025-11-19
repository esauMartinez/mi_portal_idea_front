export const verificarEmpleado = async () => {
  const storage = localStorage.getItem('empleado')
  if (storage === null) {
    return false
  }

  const user_data = JSON.parse(storage || '')
  return user_data
}
