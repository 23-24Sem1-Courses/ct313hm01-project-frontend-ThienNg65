<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Shopping cart</h3>
      </div>
    </div>

    <!-- loop over the cart items and display -->

    <div
      v-for="cartItem in cartItems"
      :key="cartItem.id"
      class="row mt-2 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <img
          :src="cartItem.imageURL"
          alt=""
          class="w-100 card-image-top embed-responsive-item"
          style="object-fit: cover"
        />
      </div>

      <!-- display product name, quantity -->
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">
            <router-link :to="{ name: 'ShowDetails', params: { id: cartItem.productId } }">
              {{ cartItem.name }}
            </router-link>
          </h6>

          <p class="mb-0 font-weight-bold" id="item-price">$ {{ cartItem.price }} per unit</p>
          <p class="mb-0" style="float: left">Quantity:{{ cartItem.quantity }}</p>
        </div>
        <p class="mb-0" style="float: right">
          Total:
          <span class="font-weight-bold"> $ {{ cartItem.price * cartItem.quantity }} </span>
        </p>
        <br />
        <a href="#" class="text-right" @click="deleteItem(cartItem.productId)">Remove from cart </a>
      </div>
      <div class="col-2"></div>
      <div class="col-12"><hr /></div>
    </div>

    <!-- display the price -->
    <div class="total-cost pt-2 text-right">
      <h5>Total : ${{ totalCost.toFixed(2) }}</h5>
      <button type="button" class="btn btn-primary confirm" @click="checkout">Confirm Order</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      cartItems: [],
      token: null,
      totalCost: 0
    };
  },
  props: [],
  methods: {
    // fetch All items in cart
    listCartItems() {
      axios
        .get(`/api/cart/`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        .then((res) => {
          const result = res.data;
          this.cartItems = result.cartItems;
          this.totalCost = result.totalCost;
        })
        .catch((err) => console.log('err', err));
    },
    deleteItem(itemId) {
      console.log(itemId);
      axios
        .delete(
          `/api/cart/`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          },
          { productId: itemId }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$router.go(0);
          }
        })
        .catch((err) => console.log('err', err));
    },
    checkout() {
      this.$router.push({ name: 'Checkout' });
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.listCartItems();
  }
};
</script>
<style scoped>
h4,
h5 {
  color: #484848;
  font-size: 700;
}
</style>
