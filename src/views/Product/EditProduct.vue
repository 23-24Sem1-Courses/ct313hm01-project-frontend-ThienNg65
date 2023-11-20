<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Product</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form v-if="product">
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model="product.categoryId" required>
              <option v-for="category of categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="product.name" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="product.description" required />
          </div>
          <div class="form-group">
            <label>imageUrl</label>
            <input type="url" class="form-control" v-model="product.imageUrl" required />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" v-model="product.price" required />
          </div>
          <button type="button" class="btn btn-primary" @click="editProduct">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import productService from '../../services/product.service';
export default {
  data() {
    return {
      product: null,
      token: null
    };
  },
  props: ['baseURL', 'products', 'categories'],
  methods: {
    async editProduct() {
      const productId = Number(this.$route.params.id);
      const updateProduct = {
        id: this.product.id,
        name: this.product.name,
        imageUrl: this.product.imageUrl,
        price: this.product.price,
        description: this.product.description,
        categoryId: this.product.categoryId
      };
      await productService
        .updateProduct(productId, updateProduct, this.token)
        .then((res) => {
          //sending the event to parent to handle
          this.$emit('fetchData');
          this.$router.push({ name: 'Product' });
          swal({
            text: 'Product Updated Successfully!',
            icon: 'success',
            closeOnClickOutside: false
          });
          return res;
        })
        .catch((err) => console.log('err', err));
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Signin' });
      return;
    }
    this.token = localStorage.getItem('token');
    this.id = this.$route.params.id;
    this.product = this.products.find((product) => product.id == this.id);
  }
};
</script>

<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
</style>
