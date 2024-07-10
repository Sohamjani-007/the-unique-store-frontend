// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';
//
// // Remove this line if it exists
// // import 'vue-infinite-loading/dist/vue-infinite-loading.css';
//
// const app = createApp(App);
//
// app.use(router);
//
// app.mount('#app');


// Below code will let show the icons of Insta, Facebook, Twitter and YouTube

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import global styles
// import './assets/styles.css';

// Import FontAwesome
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// Create and mount the Vue instance
createApp(App).use(router).mount('#app');
