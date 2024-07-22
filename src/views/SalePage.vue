<!-- src/views/Sale.vue -->
<template>
  <div class="sale-page">
    <h1>Massive Sale! Up to 50% Off</h1>
    <p>Don't miss out on our exclusive offers! Limited time only.</p>
    <div class="sale-items">
      <div class="sale-item" v-for="item in saleItems" :key="item.id">
        <img :src="item.image" :alt="item.name" />
        <h2>{{ item.name }}</h2>
        <p class="description">{{ item.description }}</p>
        <p class="original-price">Was: Rs. {{ item.original_price }}</p>
        <p class="sale-price">Now: Rs. {{ item.sale_price }}</p>
        <a :href="item.url" target="_blank" class="view-product">View Product</a>
      </div>
    </div>
    <div v-if="loading" class="loading">Loading more items...</div>
    <div ref="bottom" class="bottom-observer"></div>
    <div v-if="isModalOpen" class="modal" @click="closeModal">
      <span class="close" @click="closeModal">&times;</span>
      <img class="modal-content" :src="modalImage">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SalePage',
  data() {
    return {
      saleItems: [],
      page: 1,
      limit: 80,
      loading: false,
      apiUrl: 'https://the-unique-store-backend.onrender.com/api/sale-items/', // Update with your Django API endpoint
      isModalOpen: false,
      modalImage: ''
    };
  },
  mounted() {
    this.fetchSaleItems();
    this.setupIntersectionObserver();
  },
  methods: {
    async fetchSaleItems() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response = await axios.get(`${this.apiUrl}?page=${this.page}`);
        const data = response.data.results; // Assuming your API returns paginated results with 'results' key
        this.saleItems = [...this.saleItems, ...data];
        this.page++;
      } catch (error) {
        console.error("Error fetching sale items:", error);
      } finally {
        this.loading = false;
      }
    },
    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.fetchSaleItems();
          }
        });
      }, options);

      observer.observe(this.$refs.bottom);
    },
    redirectToUrl(url) {
      window.location.href = url;
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

.sale-item .description {
  font-size: 1rem;
  margin: 10px 0;
  transition: color var(--transition-duration);
}

.sale-item .description:hover {
  color: var(--accent-color);
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
  transition: background-color var(--transition-duration);
}

.sale-item button:hover {
  background-color: darken(var(--accent-color), 10%);
}

.loading {
  text-align: center;
  font-size: 1.5rem;
  color: var(--accent-color);
}

.bottom-observer {
  width: 100%;
  height: 20px;
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
  top: 10px;
  right: 25px;
  color: #fff;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
  transition: color var(--transition-duration);
}

.close:hover {
  color: var(--accent-color);
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
