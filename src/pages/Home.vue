<script setup>
import { RouterLink } from 'vue-router';
import Projects from './Projects.vue';
import Contact from './Contact.vue';
import About from './About.vue';
import { ref, onMounted } from 'vue';
import vineBoomFile from '../assets/vine_boom.mp3';

const displayText = ref('');
const baseText = 'developer';
const showGif = ref(false);
const showCover = ref(true);
const audioContext = ref(null);
const backgroundAudio = ref(null);

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

const initializeAudio = () => {
  try {
    // Create audio context for better control
    audioContext.value = new (window.AudioContext || window.webkitAudioContext)();
    backgroundAudio.value = new Audio(vineBoomFile);
    backgroundAudio.value.volume = 0.3; // Lower volume for background
    backgroundAudio.value.loop = true; // Loop the audio
  } catch (error) {
    console.error('Audio initialization failed:', error);
  }
};

const playVineBoom = () => {
  const audio = new Audio(vineBoomFile);
  audio.volume = 0.5; 
  audio.play().catch(e => {
    console.error('Audio play failed:', e);
  });
};

const playBackgroundAudio = () => {
  if (backgroundAudio.value && audioContext.value) {
    // Resume audio context if suspended
    if (audioContext.value.state === 'suspended') {
      audioContext.value.resume();
    }
    backgroundAudio.value.play().catch(e => {
      console.error('Background audio play failed:', e);
    });
  }
};

const stopBackgroundAudio = () => {
  if (backgroundAudio.value) {
    backgroundAudio.value.pause();
    backgroundAudio.value.currentTime = 0;
  }
};

const handleUserInteraction = () => {
  if (showCover.value) {
    showCover.value = false;
    initializeAudio();
    // Start the typing animation after user interaction
    setTimeout(typeText, 1000);
  }
};

const typeText = () => {
  if (currentStep >= steps.length) {
    // Animation complete - stop at "developer :)"
    return;
  }

  const step = steps[currentStep];
  
  if (step.action === 'type') {
    if (currentCharIndex < step.text.length) {
      displayText.value = baseText + step.text.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      
      if (step.text === '_frontend' && currentCharIndex === step.text.length) {
        showGif.value = true;
        playVineBoom();
        setTimeout(() => {
          showGif.value = false;
        }, 3000);
      }
      
      setTimeout(typeText, typingSpeed);
    } else {
      currentStep++;
      currentCharIndex = 0;
      setTimeout(typeText, 1000);
    }
  } 
  else if (step.action === 'delete') {
    if (currentCharIndex < step.text.length) {
      const remainingText = step.text.substring(currentCharIndex + 1);
      displayText.value = baseText + remainingText;
      currentCharIndex++;
      
      // Start background audio when frontend deletion begins
      if (step.text === 'frontend' && currentCharIndex === 1) {
        showGif.value = false;
        playBackgroundAudio();
      }
      
      // Stop background audio when frontend deletion is complete
      if (step.text === 'frontend' && currentCharIndex === step.text.length) {
        stopBackgroundAudio();
      }
      
      setTimeout(typeText, deletingSpeed);
    } else {
      currentStep++;
      currentCharIndex = 0;
      setTimeout(typeText, 500);
    }
  }
};

onMounted(() => {
  displayText.value = baseText;
  // Don't start typing automatically - wait for user interaction
});
</script>

<template>
  <div class="min-h-screen bg-white text-black relative w-full">
    <!-- Cover Screen -->
    <div v-if="showCover" 
         class="fixed inset-0 bg-black z-50 flex items-center justify-center cursor-pointer"
         @click="handleUserInteraction"
         @keydown.enter="handleUserInteraction"
         tabindex="0">
      <div class="text-center text-white">
        <h1 class="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p class="text-xl mb-8">Click anywhere or press Enter to begin</p>
      </div>
    </div>

    <!-- Home Section -->
    <section id="home" class="min-h-screen flex items-center justify-center relative">
      <!-- Top Section -->
      <div class="absolute top-8 left-8 right-8 flex justify-between items-start">
        <div class="text-2xl font-bold">
          raagan_u.
        </div>
      </div>

      <!-- Left Navigation -->
      <nav class="absolute left-8 top-1/2 transform -translate-y-1/2">
        <div class="flex flex-col gap-y-32">
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

      <!-- Right Side -->
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

html {
  scroll-behavior: smooth;
}

section {
  scroll-margin-top: 0;
}
</style>
