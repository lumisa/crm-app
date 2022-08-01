import axios from 'axios';
import { getStorageToken } from './helpers';

const API = 'https://express-crm.herokuapp.com/api';
//const API = 'http://localhost:8000/api';
// 'http://localhost:8080';

const RequestForm = (url, { method = 'GET', file = {} } = {}) => {
  const token = getStorageToken();
  const formData = new FormData();
  console.log(file)

  formData.append('CIE_file', file);

  const auth = token ? { Authorization: `Bearer ${token}` } : {};
  return axios({
    validateStatus: () => true,
    method,
    url: API + url,
    withCredentials: true,
    credentials: 'include',
    headers: {
      "Content-Type": "multipart/form-data",
      ...auth,
    },
    formData,
  })
    .then((res) => res)
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default RequestForm;
