import { ApiAuthClient } from './client';

const client = new ApiAuthClient('/posts');

/**
 * 학습노트 데이터 목록 조회 API
 */
const fetchPosts = () => {
  return client.get();
};

/**
 * 학습노트 데이터 조회 API
 * @param {string} id 학습노트 id
 */
const fetchPost = id => {
  return client.get(id);
};

/**
 * 학습노트 데이터 추가 API
 * @param {object} postData 학습노트 데이터
 */
const createPost = postData => {
  return client.post(null, postData);
};

/**
 * 학습노트 데이터 수정 API
 * @param {string} id 학습노트 id
 * @param {object} postData 학습노트 데이터
 */
const updatePost = (id, postData) => {
  return client.put(id, postData);
};

/**
 * 학습노트 데이터 삭제 API
 * @param {string} id 학습노트 id
 */
const deletePost = id => {
  return client.delete(id);
};

export { fetchPosts, fetchPost, createPost, updatePost, deletePost };
