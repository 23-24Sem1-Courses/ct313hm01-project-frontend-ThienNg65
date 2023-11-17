import axios from 'axios';

export default {
  getAllProducts() {
    return axios.get('/api/product/all');
  },
  getProductById(id) {
    return axios.get(`/api/product/${id}`);
  },
  addProduct(newProduct, token) {
    return axios({
      method: 'post',
      url: `/api/product/add`,
      data: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  },
  updateProduct(id, updatedProduct, token) {
    return axios({
      method: 'put',
      url: `/api/product/${id}`,
      data: JSON.stringify(updatedProduct),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  },
  deleteAllProduct() {
    return axios.delete('/api/product/all');
  },
  deleteProductById(id) {
    return axios.delete(`/api/product/${id}`);
  }
};
