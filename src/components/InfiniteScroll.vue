<template>
  <div class="product-list-container">
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="searchProducts"
        placeholder="Search by category..."
        class="search-input"
      />
    </div>
    <div class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="product.image" alt="Product Image" class="product-image" />
        <div class="product-details">
          <h2>{{ product.name }}</h2>
          <p class="category">Category: {{ product.category }}</p>
          <p class="price">Price: Rs.{{ product.price }}</p>
          <a :href="product.link" target="_blank" class="view-product">View Product</a>
        </div>
      </div>
    </div>
    <InfiniteLoading @infinite="loadMoreProducts"></InfiniteLoading>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      searchQuery: '',
      page: 1,
      limit: 10,
      apiUrl: 'http://localhost:8222/products/' // Update with your Django API endpoint
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(this.apiUrl);
        this.products = response.data;
        this.filteredProducts = this.products; // Initialize filteredProducts with all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async loadMoreProducts($state) {
      try {
        const response = await axios.get(`${this.apiUrl}?page=${this.page}&limit=${this.limit}`);
        const newProducts = response.data;

        if (newProducts.length) {
          this.products = [...this.products, ...newProducts];
          this.filteredProducts = this.products; // Update filteredProducts with all products after loading more
          this.page++;
          $state.loaded();
        } else {
          $state.complete();
        }
      } catch (error) {
        console.error('Error loading more products:', error);
        $state.complete();
      }
    },
    searchProducts() {
      if (this.searchQuery.trim() === '') {
        this.filteredProducts = this.products; // Reset to show all products if search query is empty
      } else {
        this.filteredProducts = this.products.filter(product =>
            product.category.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #230344; /* Deep purple */
  --secondary-color: #F7E8D3; /* Buttercream */
  --accent-color: #F5793B; /* Orange */
  --text-color: #223651; /* Galaxy blue */
  --font-family: 'Roboto', sans-serif;
  --transition-duration: 0.3s;
}

.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--secondary-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  animation: fadeIn var(--transition-duration) ease-in-out;
}

.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color var(--transition-duration), box-shadow var(--transition-duration);
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(35, 3, 68, 0.5);
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-duration), box-shadow var(--transition-duration);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #e0e0e0;
}

.product-details {
  padding: 16px;
}

.product-details h2 {
  font-size: 18px;
  margin-bottom: 5px;
  color: var(--primary-color);
  transition: color var(--transition-duration);
}

.product-details h2:hover {
  color: var(--accent-color);
}

.category {
  color: #666;
  font-size: 14px;
}

.price {
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--text-color);
}

.view-product {
  display: inline-block;
  background-color: var(--accent-color);
  color: var(--secondary-color);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color var(--transition-duration), transform var(--transition-duration);
}

.view-product:hover {
  background-color: #d66928;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
