import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const checkAuthBeforeEnter = (to, from, next) => {
  if (!store.getters.isLogined) {
    next('/login');
  } else {
    next();
  }
};

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      beforeEnter: checkAuthBeforeEnter,
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
      beforeEnter: checkAuthBeforeEnter,
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostEditPage.vue'),
      beforeEnter: checkAuthBeforeEnter,
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

export default router;
