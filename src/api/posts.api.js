import { httpAuthClient } from './client';

const END_POINT = '/posts';

/**
 * 학습노트 데이터 조회 API
 */
const fetchPosts = () => {
  return httpAuthClient.get(END_POINT);
};

/**
 * 학습노트 데이터 추가 API
 * @param {object} postData 학습노트 데이터
 */
const createPost = postData => {
  return httpAuthClient.post(END_POINT, postData);
};

/**
 * 학습노트 데이터 삭제 API
 * @param {string} id 학습노트 id
 */
const deletePost = id => {
  return httpAuthClient.delete(`${END_POINT}/${id}`);
};

export { fetchPosts, createPost, deletePost };
