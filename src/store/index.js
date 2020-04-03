import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser } from '@/api/users.api';
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  decodeAuthToken,
} from '@/utils/auth';
import {
  SET_TOKEN,
  CLEAR_TOKEN,
  SET_USERNAME,
  CLEAR_USERNAME,
} from './mutation-types';

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
    // 사용자이름 설정/삭제
    [SET_USERNAME](state, username) {
      state.username = username;
    },
    [CLEAR_USERNAME](state) {
      state.username = '';
    },

    // 인증토큰 설정/삭제
    [SET_TOKEN](state, token) {
      state.token = token;
    },
    [CLEAR_TOKEN](state) {
      state.token = '';
      removeAuthToken();
    },
  },
  actions: {
    async loginUser({ commit }, { username, password }) {
      const { data } = await loginUser({ username, password });

      // 상태 변경
      commit(SET_TOKEN, data.token);
      commit(SET_USERNAME, data.user.username);

      // 로컬저장소에 인증토큰 저장
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
