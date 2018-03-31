import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import data from './modules/data';
import client from './modules/client';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    data,
    client,
  },
});
