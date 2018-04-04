import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://despacho-back.herokuapp.com/api/v1/',
});

// instance.defaults.headers.common['Authorization'] = 'something'

export default instance;
