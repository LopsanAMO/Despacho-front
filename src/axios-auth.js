import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://despacho-back.herokuapp.com/api/v1/',
});

// instance.defaults.headers.common['Authorization'] = 'something'

export default instance;
