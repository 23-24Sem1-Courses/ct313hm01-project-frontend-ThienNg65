<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4>Add New Product</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <form>
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model="categoryId" required>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.categoryName }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="name" class="form-control" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" v-model="description" class="form-control" />
          </div>
          <div class="form-group">
            <label>Image Url</label>
            <input type="text" v-model="imageUrl" class="form-control" />
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" v-model="price" class="form-control" />
          </div>
          <button type="button" class="btn btn-primary" @click="addProduct">Add Product</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>

    <!--        Form-->
  </div>
</template>
<script>
import swal from 'sweetalert';
import productService from '../../services/product.service';
export default {
  props: ['categories'],
  data() {
    return {
      id: null,
      categoryId: null,
      name: null,
      description: null,
      imageUrl: null,
      price: null
    };
  },
  methods: {
    async addProduct() {
      // Create new product model
      const newProduct = {
        categoryId: this.categoryId,
        description: this.description,
        name: this.name,
        imageUrl: this.imageUrl,
        price: this.price
      };
      // get token from local cache
      const token = localStorage.getItem('token');
      await productService
        .addProduct(newProduct, token)
        .then(() => {
          this.$router.push({ name: 'Product' });
          swal({
            text: 'Product added',
            icon: 'success'
          });
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
};
</script>
