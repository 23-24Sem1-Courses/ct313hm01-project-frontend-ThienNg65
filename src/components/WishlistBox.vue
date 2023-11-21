<template>
  <div class="card h-100 w-100">
    <div class="embed-responsive embed-responsive-16by9">
      <img
        class="card-img-top embed-responsive-item"
        :src="product.imageUrl"
        alt="Card image cap"
      />
    </div>

    <a href="#" class="text-right px-3" @click="deleteWishlistItem">Remove</a>

    <div class="card-body">
      <router-link :to="{ name: 'ShowDetails', params: { id: product.id } }">
        <h5 class="card-title">{{ product.name }}</h5>
      </router-link>

      <p class="card-text">{{ product.description.substring(0, 65) }}...</p>
      <p class="card-text">${{ product.price }}</p>
      <router-link
        :to="{ name: 'EditProduct', params: { id: product.id } }"
        v-show="$route.name == 'Product'"
      >
        <button class="btn btn-primary">Edit</button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProductBox',
  props: ['product'],
  methods: {
    deleteWishlistItem() {
      this.$emit('onDeleteWishlistItem');
    }
  }
};
</script>
<style scoped>
.card {
  height: 24rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  object-fit: contain;
}
a {
  text-decoration: none;
}
.card-title {
  color: #484848;
}
</style>
