import axios from 'axios';

axios.defaults.baseURL = 'https://api.example.com';

export const client = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'foobar',
  },
});

export default axios;
