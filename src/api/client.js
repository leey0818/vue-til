import axios from 'axios';
import store from '@/store';

const authInterceptor = config => {
  config.headers['Authorization'] = store.state.token;
  return config;
};

const getClient = () => {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
};

const httpClient = getClient();

// add auth interceptor
const httpAuthClient = getClient();
httpAuthClient.interceptors.request.use(authInterceptor);

export { httpClient, httpAuthClient };
