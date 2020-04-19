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

<style scoped>
.el-main {
  margin: 0 auto;
  width: 100%;
  max-width: 1080px;
}
</style>
