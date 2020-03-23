<template>
  <div class="contents">
    <h1 class="page-header">Create Post</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title: </label>
          <input id="title" type="text" v-model.trim="title" />
        </div>
        <div>
          <label for="content">Content: </label>
          <textarea id="content" rows="5" v-model="content"></textarea>
          <p class="validation-text warning" v-show="!isContentValid">
            Content length must be less than 200
          </p>
        </div>
        <button type="submit" class="btn">Create</button>
      </form>
      <p class="log">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { createPost } from '@/api/posts.api';

export default {
  data() {
    return {
      title: '',
      content: '',
      message: '',
    };
  },
  computed: {
    isContentValid() {
      return this.content.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      const postData = {
        title: this.title,
        contents: this.content,
      };

      try {
        // 게시물 등록
        await createPost(postData);

        // 메인페이지로 이동
        alert('등록되었습니다.');
        this.$router.replace({ path: '/main' });
      } catch (error) {
        this.message = `게시물을 등록할 수 없습니다. ${error.response.data.message}`;
      }
    },
  },
};
</script>

<style scoped>
.form-wrapper .form {
  width: 100%;
}
.btn {
  color: white;
}
</style>
