<template>
  <div class="app">
    <app-header></app-header>
    <div class="app-contents">
      <router-view></router-view>
    </div>
    <toast-popup></toast-popup>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';
import ToastPopup from '@/components/common/ToastPopup';

export default {
  name: 'App',
  components: {
    AppHeader,
    ToastPopup,
  },
};
</script>

<style>
@import './css/reset.css';
@import './css/common.css';
</style>
