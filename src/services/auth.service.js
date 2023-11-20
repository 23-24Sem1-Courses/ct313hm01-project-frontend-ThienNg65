import axios from 'axios';

export default {
  findAllUsers() {
    return axios.get('/api/user/all');
  },
  validateToken(token) {
    return axios.get('/api/user/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  register(newUserInfo) {
    return axios({
      method: 'post',
      url: '/api/user/register',
      data: JSON.stringify(newUserInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  login(credentials) {
    return axios({
      method: 'post',
      url: '/api/user/login',
      data: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  logout() {
    // TODO: Implement logout functionality
  }
};
