import { httpClient } from './client';

/**
 * 회원가입 API
 * @param {object} userData 사용자 정보
 */
const createUser = userData => {
  return httpClient.post('/signup', userData);
};

/**
 * 로그인 API
 * @param {object} userData 사용자 정보
 */
const loginUser = userData => {
  return httpClient.post('/login', userData);
};

export { createUser, loginUser };
