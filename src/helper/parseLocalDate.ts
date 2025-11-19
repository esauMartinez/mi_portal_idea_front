export const parseLocalDate = (dateInput: string | Date): Date => {
  // Si ya es un Date, retornarlo directamente
  if (dateInput instanceof Date) {
    return new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate())
  }

  // Si es un string, parsearlo localmente
  const dateString = String(dateInput)
  const parts = dateString.split('T')[0]?.split('-')
  if (parts?.length === 3) {
    const year = parseInt(parts[0]!)
    const month = parseInt(parts[1]!) - 1 // Los meses en JS son 0-indexed
    const day = parseInt(parts[2]!)
    return new Date(year, month, day)
  }

  // Fallback
  return new Date(dateString)
}
