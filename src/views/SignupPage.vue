<template>
  <div class="signup-page">
    <h1 class="page-header">회원가입 페이지</h1>

    <el-card>
      <el-form
        ref="signupForm"
        status-icon
        hide-required-asterisk
        label-width="80px"
        label-position="left"
        :model="form"
        :rules="rules"
        @submit.native.prevent="submitForm"
      >
        <el-form-item label="User ID" prop="username" :error="errorMessage">
          <el-input v-model.trim="form.username" :readonly="loading" ref="uid" autofocus></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model.trim="form.password" :readonly="loading" show-password></el-input>
        </el-form-item>
        <el-form-item label="Nickname" prop="nickname">
          <el-input v-model.trim="form.nickname" :readonly="loading" ref="nickname"></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">회원가입</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createUser } from '@/api/users.api';
import bus from '@/utils/bus';

export default {
  name: 'SignupPage',
  data() {
    return {
      // form values
      form: {
        username: '',
        password: '',
        nickname: '',
      },

      // other
      loading: false,
      rules: {
        nickname: [{ required: true, trigger: 'blur', message: '사용할 닉네임을 입력하세요.' }],
        username: [{ required: true, trigger: 'blur', message: '로그인 ID를 입력하세요.' }],
        password: [
          { required: true, trigger: 'blur', message: '패스워드를 입력하세요.' },
          { min: 8, trigger: 'blur', message: '패스워드는 8자 이상 입력해야 합니다.' },
        ],
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
        nickname: this.form.nickname,
      };

      try {
        const { data } = await createUser(userData);

        bus.$emit('show:toast', `${data.username} 님이 가입되었습니다.`);
        this.$router.push('/login');
      } catch ({ response, message }) {
        // 중복된 아이디
        if (response && response.status === 409) {
          this.errorMessage = '이미 등록된 사용자 입니다. 다른 아이디를 사용하세요.';
          this.$refs.uid.focus();
        } else {
          bus.$emit('show:toast', `회원가입에 실패하였습니다. ${message}`);
        }
      } finally {
        this.loading = false;
      }
    },

    validateForm() {
      return this.$refs.signupForm.validate().catch(() => Promise.resolve(false));
    },
  },
};
</script>

<style scoped>
.signup-page {
  max-width: 460px;
  margin: 0 auto;
}
.el-button {
  width: 100%;
}
</style>
