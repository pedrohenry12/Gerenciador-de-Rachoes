import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://gerenciador-de-rachoes.onrender.com', 
});
