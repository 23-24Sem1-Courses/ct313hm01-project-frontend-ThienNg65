import axios from 'axios';

export default {
  getCartItems(token) {
    return axios.get('/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  addToCart(product, token) {
    return axios({
      method: 'post',
      url: '/api/cart/add',
      data: JSON.stringify({ product }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  updateCartItem(cartItemId, product, token) {
    return axios({
      method: 'put',
      url: `/api/cart/update/${cartItemId}`,
      data: JSON.stringify({ product }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  removeCartItem(cartItemId, token) {
    return axios({
      method: 'delete',
      url: `/api/cart/remove/${cartItemId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  removeCart(token) {
    return axios({
      method: 'delete',
      url: '/api/cart/all',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
};
