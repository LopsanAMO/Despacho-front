import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://34.218.115.218/api/v1/',
});

// instance.defaults.headers.common['Authorization'] = 'something'

export default instance;
