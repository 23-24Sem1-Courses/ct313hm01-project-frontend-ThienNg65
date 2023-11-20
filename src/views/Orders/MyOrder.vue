<template>
  <div class="my-orders">
    <h3>My Orders</h3>
    <div v-if="orders.length > 0">
      <div v-for="order in orders" :key="order.id" class="order-card mt-4">
        <!-- <router-link :to="{ name: 'OrderDetails' }"> -->
        <h2>Order #{{ order.id }}</h2>
        <!-- </router-link> -->

        <p class="order-info">Created Date: {{ formatDate(order.createdDate) }}</p>

        <p class="order-info">Total Price: ${{ order.totalPrice }}</p>

        <!-- <ul class="order-items">
          orders
          <li v-for="item in order.items" :key="item.id">
            {{ item.quantity }} x {{ item.product.name }} - ${{ item.price }}
          </li>
        </ul> -->

        <h6 class="card-title">
          <router-link v-bind:to="'/order/' + order.id">View Details</router-link>
        </h6>
      </div>
    </div>
    <div v-if="orders.length === 0" class="no-orders">
      <p>No orders available.</p>
    </div>
  </div>
</template>

<script>
import orderService from '../../services/order.service';
// import axios from 'axios';
export default {
  name: 'MyOrder',
  // props: ['baseURL'],
  data() {
    return {
      orders: [],
      // orderList: [],
      token: null
      // loading: true
    };
  },

  // FUNCTION RETRIEVE 3
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    },
    // list of order histories
    async listOrders() {
      await orderService.getAllUserOrders(this.token).then(
        (response) => {
          if (response.status == 200) {
            this.orders = response.data;
            // for each order populate orderList
            this.orders.forEach((order) => {
              this.orderList.push({
                id: order.id,
                totalCost: order.totalPrice,
                // get short date
                orderdate: order.createdDate.substring(0, 10),
                // get image of the first orderItem of the order
                imageUrl: order.orderItems[0].product.imageUrl,
                // get total items
                totalItems: order.orderItems.length
              });
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.listOrders();
  }
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
