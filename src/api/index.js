import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });

  return setInterceptors(instance);
}

// axios 객체 생성
const instance = createInstance();

/**
 * 회원가입 API
 * @param {object} userData 사용자 정보
 */
const registerUser = userData => {
  return instance.post('/signup', userData);
};

/**
 * 로그인 API
 * @param {string} userData 사용자 정보
 */
const loginUser = userData => {
  return instance.post('/login', userData);
};

/**
 * 학습노트 데이터 조회 API
 */
const fetchPosts = () => {
  return instance.get('/posts');
};

const createPost = postData => {
  return instance.post('/posts', postData);
};

export { registerUser, loginUser, fetchPosts, createPost };
