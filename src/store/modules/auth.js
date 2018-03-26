/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';


const state = {
  token: null,
};

const getters = {
  isAuthenticated: () => !!localStorage.getItem('token'),
  token: () => localStorage.getItem('token'),
};

const actions = {
  login({ commit }, authData) {
    return new Promise((resolve, reject) => {
      axios.post('users/login/', {
        email: authData.email,
        password: authData.password,
      })
        .then((res) => {
          commit('authUser', {
            idToken: res.data.token,
          });
          localStorage.setItem('token', res.data.token);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const mutations = {
  authUser(state, userData) {
    state.token = userData.idToken;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
