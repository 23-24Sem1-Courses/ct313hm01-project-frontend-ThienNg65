<template>
  <div class="my-orders">
    <h3>My Orders</h3>
    <div v-if="orders.length > 0">
      <div v-for="order in orderDisplay" :key="order.id" class="order-card mt-4">
        <h2>Order #{{ order.id }}</h2>

        <p class="order-info">Created Date: {{ order.createdDate }}</p>
        <p class="order-info">Total Price: ${{ order.totalPrice }}</p>

        <h6 class="card-title">
          <router-link v-bind:to="'/order/' + order.id">View Details</router-link>
        </h6>

        <!-- <select class="form-control" v-model="order.deliveryStatus" @change="filterOrders(order.deliveryStatus)"> -->
        <select class="form-control" v-model="order.deliveryStatus">
          <!-- <option value="all">All</option> -->
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancel">Cancel</option>
          <!-- <option value="update" v-if="selectedStatus !== 'all'">Update Status</option> -->
        </select>

        <button class="btn btn-primary mt-3" @click="updateOrderStatus(order)">Update</button>
      </div>
    </div>
    <div v-if="orders.length === 0" class="no-orders">
      <p>No orders available.</p>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
import orderService from '../services/order.service';

// import axios from 'axios';
export default {
  name: 'MyOrder',
  // props: ['baseURL'],
  data() {
    return {
      orders: [],
      orderDisplay: [],
      token: null
    };
  },

  // FUNCTION RETRIEVE 3
  methods: {
    // list of order histories
    async listOrders() {
      await orderService.getAllOrders(this.token).then(
        (response) => {
          if (response.status == 200) {
            this.orders = response.data;
            // for each order populate orderDisplay
            this.orders?.forEach((order) => {
              this.orderDisplay?.push({
                id: order.id,
                totalCost: order.totalPrice,
                // get short date
                orderdate: order.createdDate.substring(0, 10),
                // get image of the first orderItem of the order
                imageUrl: order.orderItems[0].product.imageUrl,
                // get total items
                totalItems: order.orderItems.length,
                // status
                deliveryStatus: order.deliveryStatus
              });
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    // Update the order status in the database
    async updateOrderStatus(newStatusOrder) {
      const oldStatusOrder = this.orders.find((order) => order.id === newStatusOrder.id);
      // Status remain status
      if (newStatusOrder.deliveryStatus === oldStatusOrder.deliveryStatus) {
        $toast.error('Please select an order and provide a new status', { position: 'top-right' });
        return;
      }

      try {
        var updateStatusDTO = {
          id: newStatusOrder.id,
          deliveryStatus: newStatusOrder.deliveryStatus,
          sessionId: oldStatusOrder.sessionId
        };

        await orderService.updateOrderStatus(updateStatusDTO, this.token);
        this.orderDisplay = [];
        $toast.success('Order status updated successfully', { position: 'top-right' });
        this.listOrders(); // Refresh the list of orders after updating status
      } catch (error) {
        console.error('Error updating order status:', error);
        $toast.error('Failed to update order status', { position: 'top-right' });
      }
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    // sa
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
