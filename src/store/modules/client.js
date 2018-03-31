/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';

const state = {
  status: null,
};

const actions = {
  createClients({ commit }, clientName) {
    return new Promise((resolve, reject) => {
      axios.post(
        'documents/clients',
        { name: clientName.name }, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('statusChange', res);
          resolve(res);
        })
        .catch(error => reject(error.response.data));
    });
  },
};

const mutations = {
  statusChange(state, statudData) {
    state.status = statudData;
  },
};

export default {
  state,
  actions,
  mutations,
};
