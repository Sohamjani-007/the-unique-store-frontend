<template>
  <div class="product-card" @click="redirectToProduct">
    <img :src="product.image" alt="Product Image" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.category }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    redirectToProduct() {
      window.location.href = this.product.link;
    }
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}
.product-card:hover {
  transform: scale(1.05);
}
img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
h3 {
  margin: 16px 0 8px;
}
p {
  color: #555;
}
</style>
