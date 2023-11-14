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
import categoryService from './services/category.service';
import productService from './services/product.service';
import cartService from './services/cart.service';

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
      await categoryService
        .getAllCategories()
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => console.log('err', err));

      // api call to get the products

      await productService
        .getAllProducts()
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => console.log('err', err));

      // fetch cart item if token is present i.e logged in
      if (this.token) {
        await cartService
          .getCartItems(this.token)
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
