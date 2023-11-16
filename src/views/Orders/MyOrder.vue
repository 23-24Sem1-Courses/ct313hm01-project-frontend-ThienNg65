<template>
  <div class="my-orders">
    <h3>My Orders</h3>
    <div v-if="orderList.length > 0">
      <div v-for="order in orderList" :key="order.id" class="order-card mt-4">
        <!-- <router-link :to="{ name: 'OrderDetails' }"> -->
        <h2>Order #{{ order.id }}</h2>
        <!-- </router-link> -->
        <p class="order-info">Created Date: {{ order.createdDate }}</p>
        <p class="order-info">Total Price: ${{ order.price }}</p>
        <ul class="order-items">
          orders
          <li v-for="item in order.items" :key="item.id">
            {{ item.quantity }} x {{ item.product.name }} - ${{ item.price }}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="orderList.length === 0" class="no-orders">
      <p>No orders available.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MyOrder',
  // props: ['baseURL'],
  data() {
    return {
      orderList: [],
      token: null
      // loading: true
    };
  },

  // FUNCTION RETRIVE 1
  // mounted() {
  //   // Fetch orders data from your API endpoint
  //   this.fetchOrders();
  // },
  // methods: {
  //   fetchOrders() {
  //     // Replace this with your actual API endpoint to fetch orders data
  //     // For simplicity, I'm using a fake API endpoint here
  //     fetch('api/order')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         this.orders = data;
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching orders:', error);
  //       });
  //   }
  // }

  // FUNCTION RETRIVE 2
  // async created() {
  //   try {
  //     // Fetch products from the server
  //     const orderResponse = await axios.get('api/order/');
  //     this.orders = orderResponse.data;
  //     console.log('Orders:', this.orders);

  //     // Data is loaded, set loading to false
  //     this.loading = false;
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //     // Set loading to false in case of an error
  //     this.loading = false;
  //   }

  methods: {
    // list of order histories
    listOrders() {
      axios.get(`api/order/?token=${this.token}`).then(
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
                imageURL: order.orderItems[0].product.imageURL,
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
