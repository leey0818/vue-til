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
      } catch (error) {
        bus.$emit('show:toast', `게시물을 등록할 수 없습니다. ${error.response.data.message}`);
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
