/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';


const state = {
  folders: null,
  folderUser: null,
  folderStatus: null,
};

const getters = {
  folders: state => state.folders,
  folderUser: state => state.folderUser,
};

const actions = {
  getFolders({ commit }, name) {
    axios.get(
      `documents/folders/all?name=${name}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        commit('folderData', {
          folders: res.data[0].folders,
          user: res.data[0].name,
        });
      });
  },
  createFolder({ commit }, folderData) {
    return new Promise((resolve, reject) => {
      axios.post(
        'documents/folders/', {
          name: folderData.name,
          user: folderData.user,
        }, {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          commit('folderStatus', {
            status: res.data.status,
          });
          resolve(res.data.status);
        })
        .catch(error => reject(error));
    });
  },
};

const mutations = {
  folderData(state, foldersData) {
    state.folders = foldersData.folders;
    state.folderUser = foldersData.user;
  },
  folderStatus(state, folderData) {
    state.folderStatus = folderData.status;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
