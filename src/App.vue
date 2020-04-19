<template>
  <el-container direction="vertical">
    <app-header></app-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <toast-popup></toast-popup>
  </el-container>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import ToastPopup from '@/components/common/ToastPopup.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    ToastPopup,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
body {
  background-color: #f7f6f9;
}
a {
  text-decoration: none;
}
.el-main {
  margin: 0 auto;
  width: 100%;
  max-width: 1080px;
}
/* @import './css/reset.css'; */
/* @import './css/common.css'; */
</style>
