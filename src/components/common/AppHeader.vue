<template>
  <el-header height="60px">
    <el-row type="flex" justify="space-between" align="middle" style="height:100%">
      <div>
        <router-link :to="logoLink" class="logo">
          TIL
          <span class="sub-logo" v-if="isLogined">by {{ $store.state.nickname }}</span>
        </router-link>
      </div>
      <div>
        <template v-if="isLogined">
          <el-link icon="el-icon-switch-button" :underline="false" @click="logoutUser">
            Logout
          </el-link>
        </template>
        <template v-else-if="$route.path !== '/signup'">
          <el-link icon="el-icon-user" :underline="false" @click="$router.push('/signup')">
            회원가입
          </el-link>
        </template>
        <template v-else>
          <el-link icon="el-icon-lock" :underline="false" @click="$router.push('/login')">
            로그인
          </el-link>
        </template>
      </div>
    </el-row>
  </el-header>
</template>

<script>
import { CLEAR_TOKEN, CLEAR_USERNAME } from '@/store/mutation-types';

export default {
  computed: {
    isLogined() {
      return this.$store.getters.isLogined;
    },

    logoLink() {
      return this.isLogined ? '/main' : '/login';
    },
  },
  methods: {
    logoutUser() {
      this.$store.commit(CLEAR_TOKEN);
      this.$store.commit(CLEAR_USERNAME);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #927dfc;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
}
.el-link.el-link--default {
  color: #f4f4f4;
}
.logo {
  font-size: 30px;
  font-weight: bold;
  color: white;
}
.logo > .sub-logo {
  font-size: 14px;
  font-weight: normal;
}
</style>
