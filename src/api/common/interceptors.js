import store from '@/store';

const setInterceptors = ins => {
  // Request interceptor
  ins.interceptors.request.use(config => {
    config.headers.Authorization = store.state.token;
    return config;
  });

  return ins;
};

export { setInterceptors };
