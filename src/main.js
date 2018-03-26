// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import App from './App';


import router from './router';
import store from './store/index';


Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.config.productionTip = false;

// axios.defaults.baseURL = 'http://localhost:8000/api/v1'
// axios.defaults.headers.common['Authorization'] = 'dsadas'
// // azios .defaults.headers.get['Accepts'] = 'application/json'
//
// const reqIntercerptor = axios.interceptors.request.use(config => {
//   console.log('Request Interceptor', config)
//   return config
// })
// const resInterceptor = axios.interceptors.response.use(res => {
//   console.log('Response Interceptor', res)
//   return res
// })
//
// axios.interceptors.request.eject(reqIntercerptor)
// axios.interceptors.response.eject(resInterceptor)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
