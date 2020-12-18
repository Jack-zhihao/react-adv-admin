import http from '../utils/http';

export const editAdvert = async (params) => {
  return await http.post('/advert/editAdvert', {...params})
}

export const findAdverts = async (params) => {
  return await http.post('/advert/findAdverts', {...params})
}

export const findDelete = async (params) => {
  return await http.post('/advert/findDelete', {...params})
}

