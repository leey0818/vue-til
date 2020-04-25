<template>
  <div class="post-page">
    <h1 class="page-header">Edit Post</h1>

    <post-item-form
      v-model="form"
      submit-text="Edit"
      :loading="loading"
      @submit="submitForm"
    ></post-item-form>
  </div>
</template>

<script>
import PostItemForm from '@/components/posts/PostItemForm.vue';
import { fetchPost, updatePost } from '@/api/posts.api';
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
      loading: true,
    };
  },
  methods: {
    async submitForm() {
      const id = this.$route.params.id;

      this.loading = true;

      try {
        await updatePost(id, {
          title: this.form.title,
          contents: this.form.content,
        });

        bus.$emit('show:toast', '게시물이 수정되었습니다.');
        this.$router.push('/main');
      } catch (err) {
        const { response } = err;

        if (response) {
          // 게시물 제목 중복
          if (response.status === 400) {
            bus.$emit('show:toast', '동일한 제목으로 등록된 게시물이 있습니다.');
          }
          // 게시물 없음
          if (response.status === 404) {
            bus.$emit('show:toast', '삭제된 게시물 입니다.');
            this.$router.back();
          }
        }
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    const id = this.$route.params.id;
    const { data } = await fetchPost(id);
    this.form.title = data.title;
    this.form.content = data.contents;
    this.loading = false;
  },
};
</script>

<style scoped>
.post-page {
  max-width: 700px;
  margin: 0 auto;
}
</style>
