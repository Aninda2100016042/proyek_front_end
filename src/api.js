import axios from 'axios';

const API_URL = 'https://example.com/api';

export default {
  getItems() {
    return axios.get(`${API_URL}/items`);
  },

  getItem(id) {
    return axios.get(`${API_URL}/items/${id}`);
  },

  createItem(data) {
    return axios.post(`${API_URL}/items`, data);
  },

  updateItem(id, data) {
    return axios.put(`${API_URL}/items/${id}`, data);
  },

  deleteItem(id) {
    return axios.delete(`${API_URL}/items/${id}`);
  }
}
