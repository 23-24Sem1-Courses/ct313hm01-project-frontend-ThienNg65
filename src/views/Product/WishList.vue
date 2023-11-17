<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Your WishList</h4>
      </div>
    </div>

    <!-- diaplay products -->

    <div class="row">
      <div
        v-for="product of products"
        :key="product.id"
        class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
      >
        <WishlistBox :product="product" @onDeleteWishlistItem="deleteWishlistItem(product)">
        </WishlistBox>
      </div>
    </div>
  </div>
</template>
<script>
// import swal from 'sweetalert';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

import wishlistService from '../../services/wishlist.service';
import WishlistBox from '../../components/WishlistBox.vue';

export default {
  components: { WishlistBox },
  data() {
    return {
      token: null,
      products: null
    };
  },
  props: [],
  methods: {
    async fetchWishList() {
      await wishlistService
        .getWishList(this.token)
        .then((data) => {
          this.products = data.data;
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    async deleteWishlistItem(product) {
      const wishlistItem = {
        productId: product.id
      };
      const token = localStorage.getItem('token');

      await wishlistService
        .removeWishlist(wishlistItem, token)
        .then(() => {
          this.fetchWishList();
          $toast.success('Removed Successfully', {
            // override the global option
            position: 'top-right'
          });
        })
        .catch((err) => {
          console.log('err', err);
          $toast.error('Something wrong, try again!', {
            // override the global option
            position: 'top-right'
          });
        });
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.fetchWishList();
  }
};
</script>
