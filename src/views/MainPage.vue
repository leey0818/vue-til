<template>
  <div>
    <h1 class="page-header">Today I Learned</h1>

    <!-- 게시물 목록 -->
    <post-list :items="postItems" :loading="isLoading" @deleteItem="deleteItem"></post-list>

    <div class="float-box">
      <router-link to="/add" class="button"><i class="el-icon-plus"></i></router-link>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/posts/PostList.vue';
import { fetchPosts, deletePost } from '@/api/posts.api';
import bus from '@/utils/bus';

export default {
  name: 'MainPage',
  components: {
    PostList,
  },
  data() {
    return {
      postItems: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      this.isLoading = true;

      const { data } = await fetchPosts();
      this.postItems = data.posts;
      this.isLoading = false;
    },
    async deleteItem(_id) {
      this.isLoading = true;

      try {
        // 삭제
        await deletePost(_id);
        bus.$emit('show:toast', '삭제되었습니다.');
      } catch (err) {
        const { response } = err;

        if (response) {
          // 삭제할 수 없음
          if (response.status === 400) {
            bus.$emit('show:toast', '게시물을 삭제할 수 없습니다.');
          }
          // 이미 삭제된 게시물
          if (response.status === 404) {
            bus.$emit('show:toast', '이미 삭제된 게시물 입니다.');
          }
        } else {
          bus.$emit('show:toast', `삭제 중 오류가 발생하였습니다. ${err.message}`);
        }
      }

      // 삭제 후 새로고침
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.float-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.float-box > .button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fe9616;
  border: 3px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.float-box > .button > [class^='el-icon-'] {
  font-size: 26px;
  font-weight: 600;
}
</style>
