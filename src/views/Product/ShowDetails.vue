<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <!--            display image-->
      <div class="col-md-4 col-12">
        <img :src="product.imageUrl" class="img-fluid" />
      </div>
      <!--            display product details-->
      <div class="col-md-6 col-12 pt-3 pt-md-0">
        <h4>{{ product.name }}</h4>
        <h6 class="catgory font-italic">{{ category.categoryName }}</h6>
        <h6 class="font-weight-bold">$ {{ product.price }}</h6>

        <div class="d-flex flex-row justify-content-between">
          <div class="input-group col-md-3 col-4 p-0">
            <div class="input-group-prepend">
              <span class="input-group-text">Quantity</span>
            </div>
            <input type="number" class="form-control" v-model="quantity" />
          </div>

          <div class="input-group col-md-3 col-4 p-0">
            <button class="btn" id="add-to-cart-button" @click="addToCart">Add to Cart</button>
          </div>
        </div>
        <div class="features pt-3">
          <h5><strong>Features</strong></h5>
          <p>
            {{ product.description }}
          </p>
        </div>
        <button id="wishlist-button" class="btn mr-3 p-1 py-0" @click="addToWishlist()">
          {{ wishListString }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

import wishlistService from '../../services/wishlist.service';
import cartService from '../../services/cart.service';
export default {
  name: 'ShowDetails',
  data() {
    return {
      product: {},
      category: {},
      id: null,
      token: null,
      isAddedToWishlist: false,
      quantity: 1,
      wishListString: 'Add to wishlist'
    };
  },
  props: ['products', 'categories'],
  methods: {
    async addToWishlist() {
      if (!this.token) {
        // user is not logged in
        // show some error
        $toast.error('Please login to proceed!', {
          // override the global option
          position: 'top-right'
        });
        return;
      }
      // params
      const wishlistItem = {
        productId: this.product.id
      };
      // add item to wishlist
      await wishlistService
        .addWishList(wishlistItem, this.token)
        .then(() => {
          // if (res.status === 201) {
          //   this.wishListString = 'Added to Wishlist';
          //   $toast.success('Product added to your wishlist', {
          //     // override the global option
          //     position: 'top-right'
          //   });
          // }
          $toast.success('Product added to your wishlist', {
            // override the global option
            position: 'top-right'
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
    },

    // add to cart

    addToCart() {
      if (!this.token) {
        // user is not logged in
        // show some error
        $toast.error('Please login to proceed', {
          // override the global option
          position: 'top-right'
        });
        return;
      }

      const cartItem = {
        productId: this.product.id,
        quantity: this.quantity
      };

      // add to cart
      cartService
        .addToCart(cartItem, this.token)
        .then(() => {
          // if (res.status == 201) {
          //   $toast.success('Product added to your cart', {
          //     // override the global option
          //     position: 'top-right'
          //   });
          //   this.$emit('fetchData');
          // }
          $toast.success('Product added to your cart', {
            // override the global option
            position: 'top-right'
          });
          this.$emit('fetchData');
        })
        .catch((err) => console.log('err', err));
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.product = this.products.find((product) => product.id == this.id);
    this.category = this.categories.find((category) => category.id == this.product.categoryId);
    this.token = localStorage.getItem('token');
  }
};
</script>
<style scoped>
.category {
  font-weight: 400;
}

#wishlist-button {
  background-color: #b9b9b9;
}

#add-to-cart-button {
  background-color: #febd69;
}
</style>
