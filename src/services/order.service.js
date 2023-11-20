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
  placeOrder(sessionId, token) {
    return axios({
      method: 'post',
      url: `/api/order/place-order`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        sessionId: sessionId
      }
    });
  },
  getAllUserOrders(token) {
    return axios.get('/api/order/all', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  getAllOrders(token) {
    return axios.get('/api/order/admin/', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  getUserOrderById(orderId, token) {
    return axios.get(`/api/order/${orderId}`, {
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
  },
  updateOrderStatus(updateOrder, token) {
    return axios({
      method: 'put',
      maxBodyLength: Infinity,
      url: '/api/order/admin/update',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: updateOrder
    });
  }
};
