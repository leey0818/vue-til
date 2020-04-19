import { SET_TOKEN, SET_USERNAME } from './mutation-types';
import { loginUser } from '@/api/users.api';
import { setAuthToken } from '@/utils/auth';

export default {
  async loginUser({ commit }, { username, password }) {
    const { data } = await loginUser({ username, password });

    // state 변경
    commit(SET_TOKEN, data.token);
    commit(SET_USERNAME, data.user.username);

    // 인증토큰 저장
    setAuthToken(data.token);

    return data;
  },
};
