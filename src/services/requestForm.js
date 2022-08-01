import axios from 'axios';
import { getStorageToken } from './helpers';

//const API = 'https://express-crm.herokuapp.com/api';
const API = 'http://localhost:8000/api';

const RequestForm = (url, { method = 'GET', formData = {} } = {}) => {
  const token = getStorageToken();

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
    data: formData,
  })
    .then((res) => res)
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default RequestForm;
