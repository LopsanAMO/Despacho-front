/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';

const state = {
  documents: null,
};

const getters = {
  documents: state => state.documents,
};

const actions = {
  getDocuments({ commit }, name) {
    axios.get(
      `documents/documents/all?folder=${name}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        commit('documentData', {
          docs: res.data,
        });
      });
  },
};

const mutations = {
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
