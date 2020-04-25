<template>
  <div class="login-page">
    <p class="page-header">로그인 페이지</p>

    <el-card>
      <el-form
        ref="loginForm"
        status-icon
        hide-required-asterisk
        label-width="80px"
        label-position="left"
        :model="form"
        :rules="rules"
        @submit.native.prevent="submitForm"
      >
        <el-form-item label="User ID" prop="username" :error="userErrorMessage">
          <el-input v-model="form.username" :readonly="loading" ref="uid" autofocus></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" :error="passErrorMessage">
          <el-input v-model="form.password" :readonly="loading" ref="pwd" show-password></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">로그인</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import bus from '@/utils/bus';

export default {
  name: 'LoginPage',
  data() {
    return {
      // form values
      form: {
        username: '',
        password: '',
      },

      // other
      loading: false,
      rules: {
        username: [{ required: true, trigger: 'blur', message: '로그인 ID를 입력하세요.' }],
        password: [{ required: true, trigger: 'blur', message: '패스워드를 입력하세요.' }],
      },
      userErrorMessage: '',
      passErrorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const isValid = await this.validateForm();
      if (!isValid) return;

      this.loading = true;
      this.userErrorMessage = '';
      this.passErrorMessage = '';

      const userData = {
        username: this.form.username,
        password: this.form.password,
      };

      try {
        await this.$store.dispatch('loginUser', userData);
        this.$router.push('/main');
      } catch ({ message, response }) {
        // 인증 실패
        if (response && response.status === 401) {
          if (response.data.indexOf('User not found') !== -1) {
            this.userErrorMessage = '존재하지 않는 사용자 입니다.';
            this.$refs.uid.focus();
          } else {
            this.passErrorMessage = '비밀번호가 일치하지 않습니다.';
            this.$refs.pwd.focus();
          }
        } else {
          // 기타 오류
          bus.$emit('show:toast', `오류가 발생하였습니다. ${message}`);
        }
      } finally {
        this.loading = false;
      }
    },

    validateForm() {
      return this.$refs.loginForm.validate().catch(() => Promise.resolve(false));
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 460px;
  margin: 0 auto;
}
.el-button {
  width: 100%;
}
</style>
