import axios from 'axios';

export default {
  getWishList(token) {
    return axios.get('/api/wishlist/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  addWishList(wishlistItem, token) {
    return axios({
      method: 'post',
      url: '/api/wishlist/add',
      data: JSON.stringify(wishlistItem),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  removeWishlist(wishlistItem, token) {
    return axios({
      method: 'post',
      url: '/api/wishlist/remove',
      data: JSON.stringify(wishlistItem),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
};
