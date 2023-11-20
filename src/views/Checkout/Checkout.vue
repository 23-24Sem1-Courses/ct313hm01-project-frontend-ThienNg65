<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="div_class">
    <h3>You will be redirected to payment page</h3>
    <div class="alert alert-primary">
      While making payment use card number 4242 4242 4242 4242 and enter random date and cvv (3
      digit)
    </div>

    <button class="btn btn-primary" @click="goToCheckout">Make Payment</button>
  </div>
</template>

<script>
import cartService from '../../services/cart.service';
import orderService from '../../services/order.service';
export default {
  data() {
    return {
      stripeAPIToken:
        'pk_test_51OARwyBDtE4vqaav2TrMIjYAg9NeVmhBnftzmlgEq5afxHZOvulucazbXdgRaF1qCwzl4LcenwWq4g9z2mdWKSh600BBeIkMCw',
      stripe: '',
      token: null,
      checkoutBodyArray: []
    };
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Checkout',
  props: [],
  methods: {
    async getAllItems() {
      // Get all data from current cart
      await cartService
        .getCartItems(this.token)
        .then((response) => {
          console.log(response.data);
          if (response.status == 200) {
            let products = response.data;
            for (let i = 0; i < products.cartItems.length; i++) {
              this.checkoutBodyArray.push({
                price: products.cartItems[i].price,
                quantity: products.cartItems[i].quantity,
                productName: products.cartItems[i].name,
                productId: products.cartItems[i].id
              });
            }
          }
        })
        .catch((err) => console.log(err));
    },
    async goToCheckout() {
      console.log('checkoutBodyArray', this.checkoutBodyArray);

      await orderService
        .checkoutList(this.checkoutBodyArray, this.token)
        .then((response) => {
          // Store checkout session key
          localStorage.setItem('sessionId', response.data.sessionId);

          // Wait for the payment
          this.stripe.redirectToCheckout({
            sessionId: response.data.sessionId
          });
        })
        .catch((err) => console.log(err));
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    this.stripe = window.Stripe(this.stripeAPIToken);
    this.getAllItems();
  }
};
</script>

<style scoped>
.alert {
  width: 50%;
}

.div_class {
  margin-top: 5%;
  margin-left: 30%;
}

.checkout_button {
  background-color: #5d3dec;
  margin: 10px;
}
</style>
