/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';

const state = {
  status: null,
  clientId: null,
  clientData: null,
  clients_number: null,
};

const getters = {
  clientID: state => state.clientId,
  clients: state => state.clientData,
  clientsNumber: state => state.clients_number,
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
  getClientByNamePart({ commit }, name) {
    axios.get(
      `documents/clients/?name=${name}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        commit('client', {
          clients: res.data.results,
          number: res.data.count,
        });
      });
  },
  getClients({ commit }, page) {
    return new Promise((resolve) => {
      axios.get(
        `documents/clients/all${page}`, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('client', {
            clients: res.data.results,
            number: res.data.count,
          });
          resolve(res);
        });
    });
  },
  deleteClient({ commit }, clientName) {
    return new Promise((resolve, reject) => {
      axios.delete(
        'documents/clients/2/', {
          params: { name: clientName },
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('statusChange', {
            status: res.data.status,
          });
          resolve(res);
        })
        .catch((error) => {
          reject(error);
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
    state.clients_number = clientDataInfo.number;
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
