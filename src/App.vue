<template>
  <Navbar :cartCount="cartCount" @resetCartCount="resetCartCount" />
  <router-view
    v-if="categories && products"
    style="min-height: 60vh"
    :categories="categories"
    :products="products"
    @fetchData="fetchData"
  >
  </router-view>
  <!--  footer-->
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import axios from 'axios';
export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Navbar, Footer },
  data() {
    return {
      products: null,
      categories: null,
      cartCount: 0
    };
  },
  methods: {
    async fetchData() {
      // api call to get all the categories
      await axios
        .get('/api/category/all')
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => console.log('err', err));

      // api call to get the products

      await axios
        .get('/api/product/all')
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => console.log('err', err));

      // fetch cart item if token is present i.e logged in
      if (this.token) {
        axios
          .get(`/api/cart/`, {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          })
          .then((res) => {
            const result = res.data;
            this.cartCount = result.cartItems.length;
          })
          .catch((err) => console.log('err', err));
      }
    },
    resetCartCount() {
      this.cartCount = 0;
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.fetchData();
  }
};
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
