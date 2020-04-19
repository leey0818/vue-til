import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import { SET_USERNAME } from './mutation-types';
import { getAuthToken, decodeAuthToken } from '@/utils/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: '',
    token: getAuthToken() || '',
  },
  getters,
  mutations,
  actions,
});

// 사용자명을 가져오기 위해 jwt 토큰 디코딩
const decoded = store.state.token && decodeAuthToken(store.state.token);
if (decoded && decoded.username) {
  store.commit(SET_USERNAME, decoded.username);
}

export default store;
