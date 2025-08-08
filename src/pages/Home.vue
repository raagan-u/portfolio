<script setup>
import { RouterLink } from 'vue-router';
import Projects from './Projects.vue';
import Contact from './Contact.vue';
import About from './About.vue';
import { ref, onMounted } from 'vue';

const displayText = ref('');
const baseText = 'developer';
const showGif = ref(false);

let currentStep = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let deletingSpeed = 100;

const steps = [
  { action: 'type', text: '_frontend', startFrom: 0 },
  { action: 'delete', text: 'frontend', startFrom: 0 },
  { action: 'type', text: '_backend', startFrom: 0 },
  { action: 'delete', text: 'backend', startFrom: 0 },
  { action: 'type', text: '_web2', startFrom: 0 },
  { action: 'delete', text: 'web2', startFrom: 0 },
  { action: 'type', text: '_web3', startFrom: 0 },
  { action: 'delete', text: 'web3', startFrom: 0 },
  { action: 'type', text: ' :)', startFrom: 0 }
];

const playVineBoom = () => {
  const audio = new Audio('/vine_boom.mp3');
  audio.volume = 0.5; // Set volume to 50%
  audio.play().catch(e => {
    console.log('Audio play failed:', e);
    // Try alternative path
    const altAudio = new Audio('./vine_boom.mp3');
    altAudio.volume = 0.5;
    altAudio.play().catch(e2 => console.log('Alternative audio path also failed:', e2));
  });
};

const typeText = () => {
  if (currentStep >= steps.length) {
    currentStep = 0; // Loop back to start
    setTimeout(typeText, 1000);
    return;
  }

  const step = steps[currentStep];
  
  if (step.action === 'type') {
    // Typing text
    if (currentCharIndex < step.text.length) {
      displayText.value = baseText + step.text.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      
      // Check if we just completed typing "frontend"
      if (step.text === '_frontend' && currentCharIndex === step.text.length) {
        showGif.value = true;
        playVineBoom();
        // Hide GIF after 3 seconds
        setTimeout(() => {
          showGif.value = false;
        }, 3000);
      }
      
      setTimeout(typeText, typingSpeed);
    } else {
      // Finished typing this step
      currentStep++;
      currentCharIndex = 0;
      setTimeout(typeText, 1000); // Pause before next step
    }
  } else if (step.action === 'delete') {
    // Deleting text
    if (currentCharIndex < step.text.length) {
      const remainingText = step.text.substring(currentCharIndex + 1);
      displayText.value = baseText + remainingText;
      currentCharIndex++;
      
      // Hide GIF when we start deleting "frontend"
      if (step.text === 'frontend' && currentCharIndex === 1) {
        showGif.value = false;
      }
      
      setTimeout(typeText, deletingSpeed);
    } else {
      // Finished deleting this step
      currentStep++;
      currentCharIndex = 0;
      setTimeout(typeText, 500); // Pause before next step
    }
  }
};

onMounted(() => {
  displayText.value = baseText; // Start with just "developer"
  setTimeout(typeText, 1000); // Start typing after 1 second
});
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
        <div class="flex flex-col  gap-y-32">
          <a href="#home" class="text-lg hover:underline cursor-pointer -rotate-90">home</a>
          <a href="#projects" class="text-lg hover:underline cursor-pointer -rotate-90">projects</a>
          <a href="#about" class="text-lg hover:underline cursor-pointer -rotate-90">about me</a>
          <a href="#contact" class="text-lg hover:underline cursor-pointer -rotate-90">contact me</a>
        </div>
      </nav>

      <!-- Center Content -->
      <div class="text-center relative">
        <h1 class="text-6xl dotgothic16-regular tracking-wider">
          {{ displayText }}<span class="animate-pulse">_</span>
        </h1>
        
        <!-- GIF that appears when frontend is typed -->
        <div v-if="showGif" class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full ml-8">
          <img src="/src/assets/rock_eyebrow.gif" alt="Rock eyebrow raise" class="w-64 h-64 object-contain" />
        </div>
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