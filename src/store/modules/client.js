/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';

const state = {
  status: null,
  clientId: null,
  clientData: null,
};

const getters = {
  clientID: state => state.clientId,
  clients: state => state.clientData,
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
  getClient({ commit }, clientName) {
    return new Promise((resolve, reject) => {
      axios.get(
        `documents/clients?name=${clientName}`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('setClientID', res.data.id);
          resolve(res.data.id);
        })
        .catch(error => reject(error));
    });
  },
  getClients({ commit }) {
    axios.get(
      'documents/clients/all', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        commit('client', {
          clients: res.data.results,
        });
      });
  },
};

const mutations = {
  statusChange(state, statudData) {
    state.status = statudData;
  },
  setClientID(state, userData) {
    state.clientId = userData;
  },
  client(state, clientDataInfo) {
    state.clientData = clientDataInfo.clients;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
