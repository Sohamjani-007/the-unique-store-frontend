<template>
  <div id="app">
    <!-- Header or Navigation Bar -->
    <header>
      <button @click="goBack" class="back-button">Back</button>
      <h1>THE UNIQUE STORE</h1>
      <button @click="goToSale" class="sale-button">SALE</button>
    </header>

    <!-- Main Content Area -->
    <main>
      <router-view />
    </main>

    <!-- Scroll to Top Button -->
    <button v-show="showScrollToTopButton" @click="scrollToTop" class="scroll-to-top-btn">
      <i class="fas fa-chevron-up"></i>
    </button>

    <!-- Footer -->
    <footer>
      <div class="footer-content">
        <div class="about-us">
          <h2>About Us</h2>
          <p>
            Welcome to UNIQUE, where creativity meets innovation. We specialize in crafting exceptional products that stand out from the ordinary. Our passion lies in creating unique solutions that redefine standards and inspire awe. With a commitment to quality and ingenuity, we strive to bring you products that not only meet but exceed your expectations. Explore our collection and discover the essence of originality with every item we offer. Join us on a journey where uniqueness is celebrated, and ordinary is left behind. Discover Your Next Must-Have Gem. Beyond the Ordinary. Transform Your Style with Rarity.
          </p>
        </div>
        <div class="social-media">
          <h2>Follow Us</h2>
          <div class="social-icons">
            <a href="https://www.instagram.com/yourinstagramhandle" target="_blank" class="social-icon instagram-text">
              <i class="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://www.facebook.com/yourfacebookhandle" target="_blank" class="social-icon facebook-text">
              <i class="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://www.twitter.com/yourtwitterhandle" target="_blank" class="social-icon twitter-text">
              <i class="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://www.youtube.com/youryoutubehandle" target="_blank" class="social-icon youtube-text">
              <i class="fab fa-youtube"></i> YouTube
            </a>
          </div>
        </div>
        <div class="contact-us">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:contact@theuniquestore.com" class="contact-link">contact@theuniquestore.com</a></p>
          <p>Phone: <a href="tel:+1234567890" class="contact-link">+1 234 567 890</a></p>
          <p>Address: 123 Unique Street, Creativity City, IN 45678</p>
        </div>
        <div class="newsletter">
          <h2>Subscribe to our Newsletter</h2>
          <form @submit.prevent="subscribeNewsletter">
            <input type="email" v-model="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-links">
        <a href="/privacy-policy" class="quick-link">Privacy Policy</a>
        <a href="/terms-of-service" class="quick-link">Terms of Service</a>
      </div>
      <p>&copy; 2024 THE UNIQUE STORE</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      email: '',
      scrollPosition: 0
    };
  },
  computed: {
    showScrollToTopButton() {
      return this.scrollPosition > 0;
    }
  },
  methods: {
    subscribeNewsletter() {
      // Handle newsletter subscription
      alert(`Subscribed with email: ${this.email}`);
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    goToSale() {
      this.$router.push({ name: 'Sale' });
    },
    goBack() {
      this.$router.go(-1);
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.updateScroll);
  }
};
</script>

<style>
:root {
  --primary-color: #230344; /* Deep purple */
  --secondary-color: #F7E8D3; /* Buttercream */
  --accent-color: #F5793B; /* Orange */
  --text-color: #223651; /* Galaxy blue */
  --font-family: 'Roboto', sans-serif;
  --transition-duration: 0.3s;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--secondary-color);
  color: var(--text-color);
}

header {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  background-image: url('https://www.transparenttextures.com/patterns/skulls.png'); /* Pattern */
  animation: slideInDown var(--transition-duration) ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header h1 {
  font-size: 2.5rem;
  margin: 0 auto;
  transition: color var(--transition-duration);
}

header h1:hover {
  color: var(--accent-color);
}

header .sale-button {
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  animation: blink 1s infinite;
}

header .back-button {
  padding: 10px 20px;
  background-color: var(--accent-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

header .back-button {
  margin-left: 20px;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

main {
  flex: 1;
  padding: 40px 20px;
  display: grid;
  place-items: center;
  animation: fadeIn var(--transition-duration) ease-in-out;
}

footer {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  padding: 15px 20px;
  text-align: center;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  animation: slideInUp var(--transition-duration) ease-in-out;
  background-image: url('https://www.transparenttextures.com/patterns/skulls.png'); /* Pattern */
}

.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.about-us, .social-media, .contact-us, .newsletter {
  flex: 1;
  max-width: 25%;
  margin: 10px;
  text-align: left;
}

.about-us h2, .social-media h2, .contact-us h2, .newsletter h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.about-us p, .contact-us p, .newsletter p {
  max-width: 600px;
}

.social-icons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.social-icon {
  color: var(--secondary-color);
  font-size: 1.2rem;
  text-decoration: none;
  transition: color var(--transition-duration);
}

.social-icon:hover {
  color: var(--accent-color);
}

.contact-link {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  text-decoration: none;
  transition: color var(--transition-duration);
}

.contact-link:hover {
  color: var(--accent-color);
}

.contact-link:active {
  color: #f79e3b; /* Different shade of orange */
}

footer p {
  margin: 0;
  font-size: 1rem;
}

.footer-links {
  margin: 20px 0;
}

.footer-links a {
  margin: 0 10px;
  color: var(--secondary-color);
  text-decoration: none;
  transition: color var(--transition-duration);
}

.footer-links a:hover {
  color: var(--accent-color);
}

.newsletter form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.newsletter input {
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.newsletter button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--accent-color);
  color: var(--secondary-color);
  cursor: pointer;
  transition: background-color var(--transition-duration);
}

.newsletter button:hover {
  background-color: darken(var(--accent-color), 10%);
}

.scroll-to-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color var(--transition-duration);
  opacity: 0.7;
}

.scroll-to-top-btn:hover {
  background-color: var(--accent-color);
  opacity: 1;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .about-us, .social-media, .contact-us, .newsletter {
    max-width: 100%;
    text-align: center;
  }

  .newsletter form {
    align-items: center;
  }
}

@keyframes slideInDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Instagram Text Gradient Animation */
.instagram-text {
  font-family: 'Arial Black', sans-serif;
  font-size: 1.5em;
  background-image: linear-gradient(90deg, violet, indigo, blue, green, yellow, orange, red);
  background-size: 600% 100%;
  animation: rainbow-animation 10s infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  border-radius: 10px;
}

/* Facebook Text Gradient Animation */
.facebook-text {
  font-family: 'Arial Black', sans-serif;
  font-size: 1.5em;
  background-image: linear-gradient(90deg, #3b5998, #8b9dc3);
  background-size: 600% 100%;
  animation: facebook-animation 10s infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  border-radius: 10px;
}

/* Twitter Text Gradient Animation */
.twitter-text {
  font-family: 'Arial Black', sans-serif;
  font-size: 1.5em;
  background-image: linear-gradient(90deg, #00aced, #1da1f2);
  background-size: 600% 100%;
  animation: twitter-animation 10s infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  border-radius: 10px;
}

/* YouTube Text Gradient Animation */
.youtube-text {
  font-family: 'Arial Black', sans-serif;
  font-size: 1.5em;
  background-image: linear-gradient(90deg, #ff0000, #ff5e5e);
  background-size: 600% 100%;
  animation: youtube-animation 10s infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  border-radius: 10px;
}

@keyframes rainbow-animation {
  0% { background-position: 0 0; }
  100% { background-position: 100% 0; }
}

@keyframes facebook-animation {
  0% { background-position: 0 0; }
  100% { background-position: 100% 0; }
}

@keyframes twitter-animation {
  0% { background-position: 0 0; }
  100% { background-position: 100% 0; }
}

@keyframes youtube-animation {
  0% { background-position: 0 0; }
  100% { background-position: 100% 0; }
}

/* Highlighted Sort by Section */
.sort-by-section {
  background-color: var(--accent-color);
  color: var(--secondary-color);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.sort-by-section label {
  font-weight: bold;
}

.sort-by-section select {
  padding: 5px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
}
</style>
