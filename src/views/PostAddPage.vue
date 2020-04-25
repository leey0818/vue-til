<template>
  <div class="post-page">
    <h1 class="page-header">Create Post</h1>

    <post-item-form
      v-model="form"
      submit-text="Create"
      :loading="loading"
      @submit="submitForm"
    ></post-item-form>
  </div>
</template>

<script>
import PostItemForm from '@/components/posts/PostItemForm.vue';
import { createPost } from '@/api/posts.api';
import bus from '@/utils/bus';

export default {
  components: {
    PostItemForm,
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
      },
      loading: false,
    };
  },
  methods: {
    async submitForm() {
      const postData = {
        title: this.form.title,
        contents: this.form.content,
      };

      this.loading = true;

      try {
        // 게시물 등록
        await createPost(postData);

        // 메인페이지로 이동
        bus.$emit('show:toast', '게시물이 등록되었습니다.');
        this.$router.push('/main');
      } catch (err) {
        // 게시물 중복
        if (err.response && err.response.status === 400) {
          bus.$emit(
            'show:toast',
            '동일한 제목으로 등록된 게시물이 있습니다. 다른 제목을 입력하세요.'
          );
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.post-page {
  max-width: 700px;
  margin: 0 auto;
}
</style>
