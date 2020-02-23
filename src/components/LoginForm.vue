<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input id="username" type="text" v-model.trim="username" />
    </div>
    <div>
      <label for="password">pw: </label>
      <input id="password" type="password" v-model.trim="password" />
    </div>
    <button type="submit" :disabled="!isFormValid">로그인</button>
    <p>{{ message }}</p>
  </form>
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
          console.log(JSON.stringify(data));
          this.message = `${data.user.username}님, 환영합니다!`;
          this.resetForm();
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
