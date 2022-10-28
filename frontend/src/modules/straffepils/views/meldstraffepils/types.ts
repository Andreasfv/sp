export interface SPForm {
  user: string | number | null
  amount: string
  reason: string
}

export interface Feedback {
  status: null | undefined | boolean
  message: string
}
