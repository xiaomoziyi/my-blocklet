import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const prefix = window.blocklet ? window.blocklet.prefix : '/';
    config.baseURL = prefix || '';
    config.timeout = 200000;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) => {
  if (response.status === 200) {
    return Promise.resolve(response.data);
  }
  return Promise.reject(response);
});
export default axios;
