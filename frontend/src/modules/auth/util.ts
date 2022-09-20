export const LS_AUTO_TOKEN_KEY = 'auto-token'

export function getAuthToken() {
  return localStorage.getItem(LS_AUTO_TOKEN_KEY)
}
export function setAuthToken(token: string) {
  localStorage.setItem(LS_AUTO_TOKEN_KEY, token)
}
export function clearAuthToken() {
  localStorage.removeItem(LS_AUTO_TOKEN_KEY)
}
