import axios from 'axios';

export default {
  getWishList(token) {
    return axios.get('/api/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  addWishList(productId, token) {
    return axios({
      method: 'post',
      url: '/api/wishlist/add',
      data: JSON.stringify({ productId }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  removeWishlist(productId, token) {
    return axios({
      method: 'post',
      url: '/api/wishlist/remove',
      data: JSON.stringify({ productId }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
};
