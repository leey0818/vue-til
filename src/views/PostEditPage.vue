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
        bus.$emit(
          'show:toast',
          `수정 중 오류가 발생하였습니다. ${err.response ? err.response.data : err.message}`
        );
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
