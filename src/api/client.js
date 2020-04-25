import axios from 'axios';
import store from '@/store';
import router from '@/routers';
import bus from '@/utils/bus';
import { LOGOUT } from '@/store/mutation-types';

const authInterceptor = config => {
  config.headers['Authorization'] = store.state.token;
  return config;
};

const getClient = (baseUrl = '') => {
  const options = {
    baseURL: process.env.VUE_APP_API_URL + baseUrl,
  };

  return axios.create(options);
};

class ApiClient {
  constructor(baseUrl) {
    this.client = getClient(baseUrl);
  }

  get(url, conf = {}) {
    return this.client.get(this._getUrl(url), conf);
  }

  put(url, data = {}, conf = {}) {
    return this.client.put(this._getUrl(url), data, conf);
  }

  post(url, data = {}, conf = {}) {
    return this.client.post(this._getUrl(url), data, conf);
  }

  delete(url, conf = {}) {
    return this.client.delete(this._getUrl(url), conf);
  }

  _getUrl(url) {
    return url && !url.startsWith('/') ? '/' + url : url;
  }
}

class ApiAuthClient extends ApiClient {
  constructor(baseUrl) {
    super(baseUrl);
    this.client.interceptors.request.use(authInterceptor);
    this.client.interceptors.response.use(undefined, error => {
      const { response } = error;

      // 인증정보 만료
      if (response && response.status === 401) {
        store.commit(LOGOUT);
        bus.$emit('show:toast', '인증 정보가 만료되어 재 로그인이 필요합니다.');
        router.push('/login');
      }

      return Promise.reject(error);
    });
  }
}

export default new ApiClient();
export { ApiClient, ApiAuthClient };
