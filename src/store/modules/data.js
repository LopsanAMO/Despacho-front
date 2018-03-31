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
  documents: null,
};

const getters = {
  user: state => state.user,
  documents: state => state.documents,
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
  getAllClients({ commit }) {
    axios.get(
      'documents/all', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        /* eslint-disable no-console */
        console.log(res);
        /* eslint-enable no-console */
        commit('documentData', {
          docs: res.data.results,
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
  documentData(state, docData) {
    state.documents = docData.docs;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
