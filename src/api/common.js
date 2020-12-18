import http from '../utils/http';

export const uploadFile = async (params) => {
  return await http.get('/common/uploadFile', {...params})
}