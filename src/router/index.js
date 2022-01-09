import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/Index.vue'),
  },
  {
    path: '/create',
    component: () => import('@/views/Create.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/detail/:blogId',
    component: () => import('@/views/Detail.vue'),
  },
  {
    path: '/my',
    component: () => import('@/views/My.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/user/:userId',
    component: () => import('@/views/User.vue'),
  },
  {
    path: '/edit/:blogId',
    component: () => import('@/views/Edit.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/userCenter',
    component: () => import('@/views/UserCenter'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
}; //作用为屏蔽错误

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => {
      console.log(record.meta.requiresAuth);
      return record.meta.requiresAuth;
    })
  ) {
    store.dispatch('checkLogin').then((isLogin) => {
      if (!isLogin) {
        next({ path: '/login', query: { redirect: to.fullPath } });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
