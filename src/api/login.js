import http from '../utils/http';

export const login = async (params) => {
  return await http.post('/users/login', {...params})
}

export const logout = async (params) => {
  return await http.post('/users/logout', {...params})
}

export const register = async (params) => {
  return await http.post('/users/register', {...params})
}