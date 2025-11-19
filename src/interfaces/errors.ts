export interface IErrors {
  name: string
  errors: Error[]
}

interface Error {
  message: string
  path: string
}
