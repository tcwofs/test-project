import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
    meta: {
      requiresAuth: true
    },
    children: [{ path: '/error', component: () => import('../views/Error') }]
  },
  { path: '/auth', component: () => import('../views/Auth') },
  { path: '/error', component: () => import('../views/Error') },
  {
    // others
    path: '*',
    redirect: '/error'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['authorization/isLoggedIn']) {
      return next();
    }
    next('/');
  } else {
    next();
  }
});

export default router;
