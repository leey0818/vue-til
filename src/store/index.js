import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser } from '@/api/users.api';
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  decodeAuthToken,
} from '@/utils/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: '',
    token: getAuthToken() || '',
  },
  getters: {
    isLogined({ username }) {
      return username !== '';
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = '';
      removeAuthToken();
    },
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      commit('setToken', data.token);
      commit('setUsername', data.user.username);

      // 인증토큰 저장
      setAuthToken(data.token);

      return data;
    },
  },
});

// 사용자명을 가져오기 위해 jwt 토큰 디코딩
const decoded = store.state.token && decodeAuthToken(store.state.token);
if (decoded && decoded.username) {
  store.state.username = decoded.username;
}

export default store;
