import Vue from 'vue';
import App from './App.vue';
import router from '@/routers';
import store from '@/store';
import './plugins/element-ui';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
