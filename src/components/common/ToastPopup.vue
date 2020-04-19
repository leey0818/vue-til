<template>
  <div class="toast" :class="toastAnimationClass">
    <span>{{ message }}</span>
  </div>
</template>

<script>
import bus from '@/utils/bus';

let toastTimer;

export default {
  data() {
    return {
      open: false,
      message: '',
    };
  },
  computed: {
    toastAnimationClass() {
      return this.open ? 'show' : null;
    },
  },
  methods: {
    showToast(message) {
      this.message = message;
      this.open = true;

      clearTimeout(toastTimer);
      toastTimer = setTimeout(this.hideToast, 2000);
    },
    hideToast() {
      this.message = '';
      this.open = false;
    },
  },
  created() {
    bus.$on('show:toast', this.showToast);
  },
  beforeDestroy() {
    bus.$off('show:toast', this.showToast);
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  bottom: -120px;
  width: 340px;
  padding: 15px;
  margin-left: -170px;
  background-color: #36343e;
  border-radius: 2px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.4);
  color: white;
  text-align: center;
  transition: transform 750ms ease-out;
}
.toast.show {
  transform: translateY(-140px);
  transition: transform 500ms ease-in-out;
}
</style>
