import axios from 'axios';

export default {
  getCartItems(token) {
    return axios.get('/api/cart/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  addToCart(cartItem, token) {
    return axios({
      method: 'post',
      url: '/api/cart/add',
      data: JSON.stringify(cartItem),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  updateCartItem(cartItemId, cartItem, token) {
    return axios({
      method: 'put',
      url: `/api/cart/update/${cartItemId}`,
      data: JSON.stringify(cartItem),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  removeCartItem(cartItem, token) {
    return axios({
      method: 'delete',
      url: `/api/cart/remove/`,
      data: JSON.stringify(cartItem),
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
