import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser } from '@/api/users.api';
import { saveAuth, saveUser, getAuth, getUser } from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUser() || '',
    token: getAuth() || '',
  },
  getters: {
    isLogined({ username }) {
      return username !== '';
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      commit('setToken', data.token);
      commit('setUsername', data.user.username);
      saveAuth(data.token);
      saveUser(data.user.username);

      return data;
    },
  },
});
