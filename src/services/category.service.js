import axios from 'axios';

export default {
  getAllCategories() {
    return axios.get('/api/category/all');
  },
  getCategoryById(id) {
    return axios.get(`/api/category/${id}`);
  },
  createCategory(token, newCategory) {
    return axios({
      method: 'post',
      url: `/api/category/create`,
      data: JSON.stringify(newCategory),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  },
  updateCategory(id, token, updatedCategory) {
    return axios({
      method: 'put',
      url: `/api/category/${id}`,
      data: JSON.stringify(updatedCategory),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }
};
