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
        <div>
          <label for="nickname">nickname: </label>
          <input id="nickname" type="text" v-model.trim="nickname" />
        </div>
        <button type="submit" class="btn">회원 가입</button>
      </form>
      <p class="log">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api';

export default {
  data() {
    return {
      // form values
      username: '',
      password: '',
      nickname: '',
      // log message
      message: '',
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };

      try {
        const { data } = await registerUser(userData);

        this.message = `${data.username} 님이 가입되었습니다.`;
        this.resetForm();
      } catch (error) {
        this.message = `회원가입에 실패하였습니다. ${error.response.data.errmsg}`;
      }
    },
    resetForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style></style>
