<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">id: </label>
          <input id="username" type="text" v-model.trim="username" />
        </div>
        <div>
          <label for="password">pw: </label>
          <input id="password" type="password" v-model.trim="password" />
        </div>
        <button type="submit" class="btn" :disabled="!isFormValid">
          로그인
        </button>
      </form>
      <p class="log">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/api';

export default {
  data() {
    return {
      // form values
      username: '',
      password: '',
      // log message
      message: '',
    };
  },
  computed: {
    isFormValid() {
      return this.username !== '' && this.password !== '';
    },
  },
  methods: {
    submitForm() {
      const userData = {
        username: this.username,
        password: this.password,
      };

      loginUser(userData)
        .then(({ data }) => {
          // 메인페이지로 이동
          this.$store.commit('setUsername', data.user.username);
          this.$router.push('/main');
        })
        .catch(({ response }) => {
          this.message = `로그인에 실패하였습니다. ${response.data}`;
        });
    },

    resetForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style></style>
