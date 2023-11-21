<template>
  <div id="home">
    <!--    display categories-->
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="display-5">Feature Categories</h3>
        </div>
      </div>
      <div class="row">
        <div v-for="index in this.categorySize" :key="index" class="col-md-6 col-lg-4 col-12">
          <CategoryBox class="CategoryBox" :category="categories[index - 1]" />
        </div>
      </div>
    </div>

    <!--    display top products-->
    <div class="container my-5">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="display-5">Feature Products</h3>
        </div>
      </div>

      <!-- display products-->
      <div class="row">
        <div v-for="index in this.productSize" :key="index" class="col-md-6 col-lg-4 col-12">
          <ProductBox class="ProductBox" :product="products[index - 1]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryBox from '../components/Category/CategoryBox.vue';
import ProductBox from '../components/ProductBox.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: { ProductBox, CategoryBox },
  props: ['categories', 'products'],
  data() {
    return {
      categorySize: 0,
      productSize: 0
    };
  },
  mounted() {
    this.categorySize = Math.min(6, this.categories.length);
    this.productSize = Math.min(8, this.products.length);
  }
};
</script>

<style scoped>
#home {
  padding: 20px;
}

.display-5 {
  color: #333;
}

.container {
  margin-top: 20px;
}

.row {
  margin-bottom: 20px;
}

/* Style for CategoryBox and ProductBox */
.col-md-6,
.col-lg-4,
.col-12 {
  margin-bottom: 20px;
}

/* Add box shadow to CategoryBox and ProductBox */
.CategoryBox,
.ProductBox {
  border-radius: 8px;
  transition: transform 0.2s;
}

.CategoryBox:hover,
.ProductBox:hover {
  transform: scale(1.05);
}

/* Style for heading */
h2 {
  color: #333;
}

/* Responsive styling for small screens */
@media (max-width: 576px) {
  .col-md-6,
  .col-lg-4,
  .col-12 {
    margin-bottom: 10px;
  }
}
</style>
