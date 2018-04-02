/*
 eslint no-shadow: ["error", { "allow": ["state"] }]
 "no-param-reassign": ["error", { "props": false }]
*/
import axios from '@/axios-auth';


const state = {
  folders: null,
  folder_user: null,
  folder_status: null,
  folder_id: null,
};

const getters = {
  folders: state => state.folders,
  folderUser: state => state.folder_user,
  folderID: state => state.folder_id,
};

const actions = {
  getFolderInfo({ commit }, name) {
    axios.get(
      `documents/folders/?name=${name}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        commit('folderID', {
          id: res.data.id,
        });
      });
  },
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
    state.folder_user = foldersData.user;
  },
  folderStatus(state, folderData) {
    state.folder_status = folderData.status;
  },
  folderID(state, folderData) {
    state.folder_id = folderData.id;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
