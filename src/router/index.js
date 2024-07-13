// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue'; // Adjust the import paths as necessary
import Sale from '../views/SalePage.vue'; // Ensure the Sale component path is correct

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sale',
    name: 'Sale',
    component: Sale
  }
  // Add other routes as needed
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
