export const tokenKey = 'nf_token'


export function getToken() {
return localStorage.getItem(tokenKey)
}


export function setToken(t: string) {
localStorage.setItem(tokenKey, t)
}


export function clearToken() {
localStorage.removeItem(tokenKey)
}