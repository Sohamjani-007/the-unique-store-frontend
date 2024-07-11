<template>
  <div id="app">
    <!-- Header or Navigation Bar -->
    <header>
      <h1>THE UNIQUE STORE</h1>
    </header>

    <!-- Main Content Area -->
    <main>
      <router-view />
    </main>

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
      </div>
      <p>&copy; 2024 THE UNIQUE STORE</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
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
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0;
  transition: color var(--transition-duration);
}

header h1:hover {
  color: var(--accent-color);
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
  padding: 15px;
  text-align: center;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  animation: slideInUp var(--transition-duration) ease-in-out;
  background-image: url('https://www.transparenttextures.com/patterns/skulls.png'); /* Pattern */
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.about-us, .social-media {
  margin-bottom: 20px;
}

.about-us h2, .social-media h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.about-us p {
  max-width: 600px;
  text-align: center;
}

.social-icons {
  display: flex;
  gap: 20px;
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

footer p {
  margin: 0;
  font-size: 1rem;
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
</style>
