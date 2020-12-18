import Cookies from 'js-cookie'

export const setCookie =(name, value) => {
  Cookies.set(name, value, {path: ''});
}
export const getCookie =(name) => {
  const result = Cookies.get(name);
  return JSON.parse(result === 'undefined' || !result? '{}': result);
}

export const removeCookie =(name) => {
  Cookies.remove(name, { path: '' })
}