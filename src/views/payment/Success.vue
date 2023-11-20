<template>
  <div class="text-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
import orderService from '../../services/order.service';
import sweetalert from 'sweetalert';

export default {
  name: 'PaymentSuccess',
  props: ['baseURL'],
  data() {
    return {
      token: null,
      sessionId: null
    };
  },
  methods: {
    async saveOrder() {
      if (this.sessionId !== null && this.token !== null) {
        await orderService
          .placeOrder(this.sessionId, this.token)
          .then(() => {
            window.location.href = '/order';
          })
          .catch((error) => {
            console.log(error);
            sweetalert({
              text: error.message,
              icon: 'error'
            });
          });
      }
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.sessionId = localStorage.getItem('sessionId');
    this.saveOrder();
  }
};
</script>
