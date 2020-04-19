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
        <el-form-item label="User ID" prop="username">
          <el-input v-model="form.username" :readonly="loading" autofocus></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password" :error="errorMessage">
          <el-input v-model="form.password" :readonly="loading" ref="pass" show-password></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">로그인</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
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
      errorMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const isValid = await this.validateForm();
      if (!isValid) return;

      this.loading = true;
      this.errorMessage = '';

      const userData = {
        username: this.form.username,
        password: this.form.password,
      };

      try {
        await this.$store.dispatch('loginUser', userData);
        this.$router.push('/main');
      } catch (error) {
        this.errorMessage = error.response ? error.response.data : error.message;
        this.$refs.pass.focus();
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
