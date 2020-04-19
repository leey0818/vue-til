import * as types from './mutation-types';
import { removeAuthToken } from '@/utils/auth';

export default {
  // 사용자 이름 설정/삭제
  [types.SET_USERNAME](state, username) {
    state.username = username;
  },
  [types.CLEAR_USERNAME](state) {
    state.username = '';
  },

  // 인증토큰 설정/삭제
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.CLEAR_TOKEN](state) {
    state.token = '';
    removeAuthToken();
  },
};
