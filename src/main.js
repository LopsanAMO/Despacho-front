// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import moment from 'moment';
import App from './App';


import router from './router';
import store from './store/index';


Vue.filter('formatDate', value => moment(String(value)).format('YYYY/MM/DD hh:mm'));
Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
