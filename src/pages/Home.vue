<script setup>
import { RouterLink } from 'vue-router';
import Projects from './Projects.vue';
import Contact from './Contact.vue';
import About from './About.vue';
</script>

<template>
  <div class="min-h-screen bg-white text-black relative w-full">
    <!-- Home Section -->
    <section id="home" class="min-h-screen flex items-center justify-center relative">
      <!-- Top Section -->
      <div class="absolute top-8 left-8 right-8 flex justify-between items-start">
        <!-- Logo in top-left -->
        <div class="text-2xl font-bold">
          raagan_u.
        </div>
      </div>

      <!-- Left Navigation (only in home section) -->
      <nav class="absolute left-8 top-1/2 transform -translate-y-1/2">
        <div class="flex flex-col space-y-8">
          <a href="#home" class="text-lg hover:underline cursor-pointer">home</a>
          <a href="#projects" class="text-lg hover:underline cursor-pointer">projects</a>
          <a href="#about" class="text-lg hover:underline cursor-pointer">about me</a>
          <a href="#contact" class="text-lg hover:underline cursor-pointer">contact me</a>
        </div>
      </nav>

      <!-- Center Content -->
      <div class="text-center">
        <h1 class="text-6xl font-mono tracking-wider">
          front-end. web (developer)
          <span class="animate-pulse">_</span>
        </h1>
      </div>

      <!-- Right Side - Dark Mode (only in home section) -->
      <div class="absolute right-8 bottom-8">
        <div class="text-lg cursor-pointer hover:underline">
          dark mode.
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="min-h-screen p-8">
      <Projects />
    </section>

    <!-- About Section -->
    <section id="about" class="min-h-screen p-8">
      <About />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="min-h-screen p-8">
      <Contact />
    </section>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Smooth scrolling for the entire page */
html {
  scroll-behavior: smooth;
}

/* Ensure sections take full viewport height */
section {
  scroll-margin-top: 0;
}
</style>