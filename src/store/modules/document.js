/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';

const state = {
  documents: null,
  document_status: null,
  document_data: {
    name: '',
    id: 0,
  },
};

const getters = {
  documents: state => state.documents,
  document_short_data_info: state => state.document_data,
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
            status: res.data.status,
          });
          resolve(res.data.status);
        })
        .catch(error => reject(error));
    });
  },
  updateDocument({ commit }, documentData) {
    return new Promise((resolve, reject) => {
      axios.put(
        `documents/documents/${documentData.id}`,
        documentData.data, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('documentStatus', {
            status: res.data.status,
          });
          resolve(res);
        })
        .catch(error => reject(error));
    });
  },
  deleteDocument({ commit }, docuemntName) {
    return new Promise((resolve, reject) => {
      axios.delete(
        'documents/documents/2',
        {
          params: { name: docuemntName },
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('documentStatus', { status: res.data.status });
          resolve(res);
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
  documentShortInfo(state, docData) {
    state.document_data.name = docData.doc_name;
    state.document_data.id = docData.doc_id;
  },
};


export default {
  state,
  getters,
  actions,
  mutations,
};
