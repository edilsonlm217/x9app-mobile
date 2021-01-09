import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.137.10:3333/', // local connection
  // baseURL: 'http://200.98.203.122:3334/', // VPS connection
});

export default api;