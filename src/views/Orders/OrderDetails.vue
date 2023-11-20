<template>
  <div class="order-details-container">
    <h3 class="text-center my-3">Order Details</h3>

    <div v-if="orderItems.length > 0" class="order-items-container d-flex justify-content-center">
      <div v-for="orderItem in orderItems" :key="orderItem.id" class="order-item">
        <!-- <div class="item-details"> -->
        <div class="col-md">
          <img :src="orderItem.product.imageUrl" alt="Product Image" class="product-image col-lg" />
        </div>

        <div class="col-sm">
          <router-link
            class="text-dark"
            :to="{ name: 'ShowDetails', params: { id: orderItem.product.id } }"
          >
            <h5 class="col-sm d-flex">{{ orderItem.product.name }}</h5>
          </router-link>
        </div>

        <div class="col-sm">
          <p class="ml-5 col-sm d-flex">Quantity: {{ orderItem.quantity }}</p>
        </div>

        <div class="col-sm">
          <p class="col-sm d-flex">Price: ${{ orderItem.price }}</p>
        </div>

        <!-- </div> -->
      </div>
    </div>

    <div v-else>
      <p>No order items available.</p>
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
.order-details-container {
  margin: 0 auto;
  padding: 20px;
}

.order-items-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.order-item {
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  width: 1000px;
  border-radius: 8px;
  transition: transform 0.2s;
}
.order-item:hover {
  transform: scale(1.05);
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 20px;
  object-fit: contain;
}

.item-details {
  flex-grow: 1;
}
</style>
