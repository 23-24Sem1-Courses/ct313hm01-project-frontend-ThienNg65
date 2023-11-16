<template>
  <div class="my-orders">
    <h3>My Orders</h3>
    <div v-for="order in orders" :key="order.id" class="order-card mt-4">
      <h2>Order #{{ order.id }}</h2>
      <p class="order-info">Created Date: {{ order.createdDate }}</p>
      <p class="order-info">Total Price: ${{ order.price }}</p>
      <ul class="order-items">
        <li v-for="item in order.items" :key="item.id">
          {{ item.quantity }} x {{ item.product.name }} - ${{ item.price }}
        </li>
      </ul>
    </div>
    <div v-if="orders.length === 0" class="no-orders">
      <p>No orders available.</p>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'MyOrder',
  data() {
    return {
      orders: []
      // loading: true
    };
  },
  mounted() {
    // Fetch orders data from your API endpoint
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      // Replace this with your actual API endpoint to fetch orders data
      // For simplicity, I'm using a fake API endpoint here
      fetch('api/order/all')
        .then((response) => response.json())
        .then((data) => {
          this.orders = data;
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }

  // async created() {
  //   try {
  //     // Fetch products from the server
  //     const orderResponse = await axios.get('api/order/all');
  //     this.orders = orderResponse.data;
  //     console.log('Orders:', this.orders);

  //     // Data is loaded, set loading to false
  //     this.loading = false;
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //     // Set loading to false in case of an error
  //     this.loading = false;
  //   }
  // }
};
</script>

<style scoped>
.my-orders {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.order-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.order-info {
  margin: 5px 0;
}

.order-items {
  list-style: none;
  padding: 0;
}

.order-items li {
  margin-bottom: 5px;
}

.no-orders {
  text-align: center;
  margin-top: 20px;
  color: #888;
}
</style>
