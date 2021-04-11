import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        // path: '/error',
        // component: () => import('../views/Error'),
        // meta: {
        //   requiresAuth: true
        // }
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth'),
    props: true
  },
  {
    path: '/not-found',
    name: 'not-fond',
    component: () => import('../views/NotFound')
  },
  { path: '*', redirect: '/not-found' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('user')) {
      return next();
    }
    next('/');
  } else {
    if (localStorage.getItem('user') && to.path === '/auth') {
      return next('/');
    }
    return next();
  }
});

export default router;
