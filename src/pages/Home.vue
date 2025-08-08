<script setup>
import { RouterLink } from 'vue-router';
import Projects from './Projects.vue';
import Contact from './Contact.vue';
import About from './About.vue';
</script>

<template>
  <div class="min-h-screen bg-white text-black relative">
    <!-- Top Section -->
    <div class="flex justify-between items-start p-8">
      <!-- Logo in top-left -->
      <div class="text-2xl font-bold">
        raagan_u.
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex min-h-screen">
      <!-- Left Navigation -->
      <nav class="w-64 p-8 flex flex-col justify-center">
        <div class="flex flex-col space-y-8">
          <RouterLink to="/" class="text-lg hover:underline cursor-pointer">home</RouterLink>
          <RouterLink to="projects" class="text-lg hover:underline cursor-pointer">projects</RouterLink>
          <RouterLink to="/about" class="text-lg hover:underline cursor-pointer">about me</RouterLink>
          <RouterLink to="/contact" class="text-lg hover:underline cursor-pointer">contact me</RouterLink>
        </div>
      </nav>

      <!-- Center Content -->
      <div class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-6xl font-mono tracking-wider">
            front-end. web (developer)
            <span class="animate-pulse">_</span>
          </h1>
        </div>
      </div>

      <!-- Right Side -->
      <div class="w-64 p-8 flex flex-col justify-end">
        <div class="text-lg cursor-pointer hover:underline">
          dark mode.
        </div>
      </div>
    </div>
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
</style>