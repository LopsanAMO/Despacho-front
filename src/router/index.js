import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import users from '@/components/user';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/users',
      name: 'users',
      component: users,
      props: true,
    },
  ],
});
