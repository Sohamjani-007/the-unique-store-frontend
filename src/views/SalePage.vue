<!-- src/views/Sale.vue -->
<template>
  <div class="sale-page">
    <h1>Massive Sale! Up to 50% Off</h1>
    <p>Don't miss out on our exclusive offers! Limited time only.</p>
    <div class="sale-items">
      <div class="sale-item" v-for="item in saleItems" :key="item.id">
        <img :src="item.image" :alt="item.name" />
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p class="original-price">Was: ${{ item.originalPrice }}</p>
        <p class="sale-price">Now: ${{ item.salePrice }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalePage',
  data() {
    return {
      saleItems: [
        { id: 1, name: 'Item 1', description: 'Description for item 1', originalPrice: 100, salePrice: 50, image: 'path/to/image1.jpg' },
        { id: 2, name: 'Item 2', description: 'Description for item 2', originalPrice: 150, salePrice: 75, image: 'path/to/image2.jpg' },
        // Add more sale items as needed
      ]
    };
  },
  methods: {
    addToCart(item) {
      // Handle adding item to cart
      alert(`Added ${item.name} to cart!`);
    }
  }
};
</script>

<style scoped>
.sale-page {
  padding: 20px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  text-align: center;
}

.sale-page h1 {
  font-size: 3rem;
  color: var(--accent-color);
  margin-bottom: 20px;
}

.sale-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.sale-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  flex: 1 1 300px;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sale-item img {
  max-width: 100%;
  border-radius: 10px;
}

.sale-item h2 {
  font-size: 1.5rem;
  margin: 10px 0;
}

.sale-item p {
  font-size: 1rem;
  margin: 10px 0;
}

.original-price {
  text-decoration: line-through;
  color: #888;
}

.sale-price {
  font-size: 1.5rem;
  color: var(--accent-color);
  font-weight: bold;
}

.sale-item button {
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sale-item button:hover {
  background-color: darken(var(--accent-color), 10%);
}
</style>
