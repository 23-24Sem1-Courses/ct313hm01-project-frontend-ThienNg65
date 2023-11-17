<template>
  <div class="order-details">
    <h1>Order Details</h1>
    <div v-if="orderItems">
      <!-- <h2>Order Item #{{ orderItem.id }}</h2> -->
      <div
        v-for="orderItem of orderItems"
        :key="orderItem.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <img :src="orderItem.product.imageUrl" class="w-100 card-img-top embed-responsive-item" />
        <hr />
        <h6 class="card-title text-center">{{ orderItem.product.name }}</h6>
        <p class="order-info">Quantity: {{ orderItem.quantity }}</p>
        <p class="order-info">Price: ${{ orderItem.price }}</p>
      </div>
    </div>
    <div v-else>
      <p>No order item available.</p>
    </div>
  </div>
</template>

<script>
// import { orderItemData } from './TestItemData.js';
import orderService from '../../services/order.service';

export default {
  name: 'OrderDetails',
  data() {
    return {
      order: null,
      orderItems: [],
      token: null
    };
  },

  methods: {
    async fetchOrderItemDetails() {
      const orderId = this.$route.params.id;
      console.log(orderId);
      await orderService
        .getOrderById(orderId, this.token)
        .then((res) => {
          this.order = res.data;
          this.orderItems = this.order.orderItems;
        })
        .catch((error) => {
          console.error('Error fetching order item details:', error);
        });
      // this.orderItem = orderItemData;
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.fetchOrderItemDetails();
  }
};
</script>

<style scoped>
.order-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.order-info {
  margin: 5px 0;
}

.order-details p {
  text-align: center;
  color: #888;
}
</style>
