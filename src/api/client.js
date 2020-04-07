import axios from 'axios';
import store from '@/store';

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
  }
}

export default new ApiClient();
export { ApiClient, ApiAuthClient };
