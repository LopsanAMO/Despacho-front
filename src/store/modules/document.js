/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';

const state = {
  documents: null,
  document_status: null,
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
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        commit('documentData', {
          docs: res.data,
        });
      });
  },
  createDocument({ commit }, formdata) {
    return new Promise((resolve, reject) => {
      axios.post(
        'documents/documents/',
        formdata, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('documentStatus', {
            status: res.data.stattus,
          });
          resolve(res.data.status);
        })
        .catch(error => reject(error));
    });
  },
};

const mutations = {
  documentData(state, docData) {
    state.documents = docData.docs;
  },
  documentStatus(state, docData) {
    state.document_status = docData.status;
  },
};


export default {
  state,
  getters,
  actions,
  mutations,
};
