import * as types from './mutation-types';
import { removeAuthToken } from '@/utils/auth';

export default {
  [types.SET_NICKNAME](state, nickname) {
    state.nickname = nickname;
  },
  [types.SET_USERNAME](state, username) {
    state.username = username;
  },
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.LOGOUT](state) {
    removeAuthToken();
    state.token = '';
    state.username = '';
    state.nickname = '';
  },
};
