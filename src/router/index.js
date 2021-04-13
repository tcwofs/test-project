import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/views/Main';
import Home from '@/components/Main/Home';
import Post from '@/components/Main/Post';
import Details from '@/components/Main/Details';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../components/Main/Dashboard'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/post/:id',
        name: 'post',
        component: Post,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/details/:id',
        name: 'details',
        component: Details,
        meta: {
          requiresAuth: true
        }
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
