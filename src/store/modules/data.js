/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';

const state = {
  data: null,
  user: {
    username: null,
    first_name: null,
    last_name: null,
    email: null,
  },
};

const getters = {
  user: state => state.user,
};

const actions = {
  getUserData({ commit }) {
    axios.get(
      'users/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        commit('authUser', {
          userData: {
            username: res.data.username,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
          },
        });
      });
  },
};

const mutations = {
  authUser(state, userData) {
    state.user.username = userData.username;
    state.user.first_name = userData.first_name;
    state.user.last_name = userData.last_name;
    state.user.email = userData.email;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
