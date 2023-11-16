<template>
  <div class="order-details">
    <h1>Order Details</h1>
    <div v-if="orderItem">
      <!-- <h2>Order Item #{{ orderItem.id }}</h2> -->

      <img :src="orderItem.product.imageURL" class="w-100 card-img-top embed-responsive-item" />
      <hr />
      <h6 class="card-title text-center">{{ orderItem.product.name }}</h6>
      <p class="order-info">Quantity: {{ orderItem.quantity }}</p>
      <p class="order-info">Price: ${{ orderItem.price }}</p>
    </div>
    <div v-else>
      <p>No order item available.</p>
    </div>
  </div>
</template>

<script>
import { orderItemData } from './TestItemData.js';
export default {
  name: 'OrderDetails',
  data() {
    return {
      orderItem: orderItemData
    };
  },
  mounted() {
    // Fetch order item details data from your API endpoint
    this.fetchOrderItemDetails();
  },
  methods: {
    fetchOrderItemDetails() {
      // Replace this with your actual API endpoint to fetch order item details
      // For simplicity, I'm using a fake API endpoint here
      // const orderItemId = this.$route.params.id; // Assuming you use Vue Router and the order item ID is in the route params
      // fetch(`api/order/${orderItemId}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     this.orderItem = data;
      //   })
      //   .catch((error) => {
      //     console.error('Error fetching order item details:', error);
      //   });
      this.orderItem = orderItemData;
    }
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
