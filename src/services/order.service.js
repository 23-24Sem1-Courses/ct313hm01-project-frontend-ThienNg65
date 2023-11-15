import axios from 'axios';

export default {
  checkoutList(checkoutDetails, token) {
    return axios({
      method: 'post',
      url: '/api/order/create-checkout-session',
      data: JSON.stringify(checkoutDetails),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  },
  placeOrder(orderId, token) {
    return axios({
      method: 'post',
      url: `/api/order/place-order/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  getAllOrders(token) {
    return axios.get('/api/order', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  getOrderById(orderId, token) {
    return axios.get(`/api/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }
};
