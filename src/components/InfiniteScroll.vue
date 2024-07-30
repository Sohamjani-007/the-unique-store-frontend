<template>
  <div class="product-list-container">
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="searchAndFilterProducts"
        placeholder="Search Your Product Here"
        class="search-input custom-placeholder"

      />
      <div class="filter-container">
        <label for="filter-by-category">Filter by</label>
        <select id="filter-by-category" v-model="selectedCategory" @change="searchAndFilterProducts" class="filter-by-category-select">
          <option value="">All Categories</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="sorting-container">
        <label for="sort-by">Sort by</label>
        <select id="sort-by" v-model="sortBy" @change="sortProducts" class="sort-by-select">
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
    </div>
    <div class="product-list">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <div class="image-container">
          <img :src="product.image" alt="Product Image" class="product-image" />
          <button @click="openModal(product.image)" class="zoom-button">Zoom</button>
        </div>
        <div class="product-details">
          <h2>{{ product.name }}</h2>
          <p class="category">Category: {{ product.category }}</p>
          <p class="price">Price: Rs.{{ product.price }}</p>
          <a :href="product.link" target="_blank" class="view-product">View Product</a>
        </div>
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">Next</button>
    </div>

    <div v-if="isModalOpen" class="modal" @click="closeModal">
      <span class="close" @click="closeModal">&times;</span>
      <img class="modal-content" :src="modalImage">
    </div>
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
      selectedCategory: '',
      page: 1,
      limit: 80,
      sortBy: 'name',
      apiUrl: 'http://localhost:8222/products/', // Update with your Django API endpoint
      isModalOpen: false,
      modalImage: ''
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.limit);
    },
    paginatedProducts() {
      const start = (this.page - 1) * this.limit;
      const end = start + this.limit;
      return this.filteredProducts.slice(start, end);
    },
    uniqueCategories() {
      const categories = this.products.map(product => product.category);
      return [...new Set(categories)];
    }
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
        this.sortProducts(); // Sort products initially
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    searchAndFilterProducts() {
      this.filteredProducts = this.products.filter(product => {
        const matchesQuery = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                             product.category.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
        return matchesQuery && matchesCategory;
      });
      this.sortProducts(); // Sort after filtering
      this.page = 1; // Reset to first page
    },
    sortProducts() {
      this.filteredProducts.sort((a, b) => {
        if (this.sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (this.sortBy === 'price') {
          return a.price - b.price;
        }
      });
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
      }
    },
    openModal(image) {
      this.modalImage = image;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  flex: 20;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color var(--transition-duration), box-shadow var(--transition-duration);
  background-image: linear-gradient(90deg, powderblue, orange);
  margin-bottom: 10px;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(35, 3, 68, 0.5);
}

.custom-placeholder::placeholder {
  color: #230344; /* Change this to your desired color */
  opacity: 1; /* Ensure the color is fully opaque */
}

.filter-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  flex: 6;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color var(--transition-duration), box-shadow var(--transition-duration);
  background-image: linear-gradient(90deg, orange, powderblue);
  margin-bottom: 10px;
}

.filter-container label {
  margin-right: 10px;
  color: var(--text-color);
}

.filter-by-category-select {
  width: 180px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color var(--transition-duration), box-shadow var(--transition-duration);
}

.filter-by-category-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(35, 3, 68, 0.5);
}

.sorting-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  flex: 2;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color var(--transition-duration), box-shadow var(--transition-duration);
  background-image: linear-gradient(90deg, powderblue, orange);
  margin-bottom: 10px;
}

.sorting-container label {
  margin-right: 10px;
  color: var(--text-color);
}

.sorting-container select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color var(--transition-duration), box-shadow var(--transition-duration);
}

.sorting-container select:focus {
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

.image-container {
  position: relative;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform var(--transition-duration);
}

.zoom-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color var(--transition-duration), transform var(--transition-duration);
}

.zoom-button:hover {
  background-color: var(--accent-color);
  transform: scale(1.05);
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
  padding-bottom: 10px;
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
  background-color: var(--primary-color);
  transform: scale(1.05);
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-controls button {
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  cursor: pointer;
  transition: background-color var(--transition-duration), transform var(--transition-duration);
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-controls button:hover:not(:disabled) {
  background-color: var(--accent-color);
  transform: scale(1.05);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn var(--transition-duration) ease-in-out;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  animation: zoomIn var(--transition-duration) ease-in-out;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  transition: color var(--transition-duration);
}

.close:hover {
  color: var(--accent-color);
}

.filter-by-category-select, .sort-by-select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #F7E8D3;
  color: #ff5e5e;
  transition: background-color var(--transition-duration), color var(--transition-duration);
}

.filter-by-category-select option, .sort-by-select option {
  max-width: 180px !important;
  background-color: var(--accent-color);
  color: var(--secondary-color);
}

.filter-by-category-select:focus, .sort-by-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(35, 3, 68, 0.5);
  background-color: var(--primary-color);
  color: var(--secondary-color);
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
