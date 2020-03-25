<template>
  <div class="contents">
    <h1 class="page-header">Edit Post</h1>
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
        <button type="submit" class="btn">Edit</button>
      </form>
      <p class="log">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { fetchPost, updatePost } from '@/api/posts.api';
import bus from '@/utils/bus';

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
      const id = this.$route.params.id;

      try {
        await updatePost(id, {
          title: this.title,
          contents: this.content,
        });

        bus.$emit('show:toast', '게시물이 수정되었습니다.');
        this.$router.push('/main');
      } catch (err) {
        this.message = `수정 중 오류가 발생하였습니다. ${
          err.response ? err.response.data : err.message
        }`;
      }
    },
  },
  async created() {
    const id = this.$route.params.id;
    const { data } = await fetchPost(id);
    this.title = data.title;
    this.content = data.contents;
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
