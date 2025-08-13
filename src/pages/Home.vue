<script setup>
import { RouterLink } from 'vue-router';
import Projects from './Projects.vue';
import About from './About.vue';
import { ref, onMounted } from 'vue';
import vineBoomFile from '../assets/vine_boom.mp3';

const displayText = ref('');
const baseText = 'developer';
const showGif = ref(false);
const showCover = ref(true);
const showSubtext = ref(false);
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
  { action: 'type', text: '_backend & web3', startFrom: 0 },
  { action: 'delete', text: 'backend & web3', startFrom: 0 },
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
    // Animation complete - show subtext
    showSubtext.value = true;
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
        stopBackgroundAudio();
      }
      
      // Stop background audio when frontend deletion is complete
      // if (step.text === 'frontend' && currentCharIndex === step.text.length) {
      //   stopBackgroundAudio();
      // }
      
      setTimeout(typeText, deletingSpeed);
    } else {
      currentStep++;
      currentCharIndex = 0;
      setTimeout(typeText, 500);
    }
  }
};

const openGardenFinance = () => {
  window.open('https://garden.finance', '_blank');
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
        <p class="text-xl mb-8">Click anywhere to begin</p>
      </div>
    </div>

    <!-- Home Section -->
    <section id="home" class="min-h-screen flex items-center justify-center relative">
      <!-- Top Section -->
      <div class="absolute top-8 left-8 right-8 flex justify-between items-start">
        <div class="text-xl md:text-2xl font-bold">
          raagan_u.
        </div>
        <div class="flex items-center gap-2 relative group hidden md:flex">
          <span class="transition-all duration-300 group-hover:opacity-0">Building cool things at</span>
          <div class="relative">
            <svg width="116" height="34" viewBox="0 0 116 34" class="cursor-pointer" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M103.691 10.6876H106.961V12.387C107.322 11.8549 107.871 11.4086 108.609 11.0481C109.365 10.6705 110.223 10.4816 111.184 10.4816C112.609 10.4816 113.768 10.9194 114.66 11.7948C115.553 12.6531 115.999 13.829 115.999 15.3224V23.665H112.729V16.0176C112.729 15.1936 112.497 14.5413 112.034 14.0607C111.588 13.5801 110.987 13.3397 110.232 13.3397C109.219 13.3397 108.421 13.7517 107.837 14.5757C107.253 15.3996 106.961 16.5497 106.961 18.026V23.665H103.691V10.6876Z" fill="currentColor"></path><path d="M96.0804 23.8709C94.7586 23.8709 93.5914 23.5877 92.5786 23.0212C91.5658 22.4548 90.7762 21.6651 90.2097 20.6524C89.6604 19.6396 89.3857 18.4809 89.3857 17.1763C89.3857 15.8889 89.669 14.7387 90.2354 13.726C90.8019 12.7132 91.5744 11.9236 92.5528 11.3571C93.5484 10.7734 94.6728 10.4816 95.9259 10.4816C97.179 10.4816 98.2862 10.7563 99.2475 11.3056C100.209 11.8377 100.947 12.5844 101.462 13.5457C101.994 14.507 102.26 15.5799 102.26 16.7643C102.26 17.1076 102.234 17.4767 102.183 17.8715H92.6301C92.7502 18.9186 93.1193 19.7254 93.7373 20.2919C94.3552 20.8583 95.1277 21.1416 96.0547 21.1416C96.7756 21.1416 97.3764 20.9871 97.8571 20.6781C98.3377 20.3691 98.6553 19.9486 98.8098 19.4164H102.054C101.814 20.7554 101.161 21.8368 100.097 22.6608C99.0329 23.4675 97.694 23.8709 96.0804 23.8709ZM98.8098 15.4769C98.7926 14.7387 98.5179 14.1465 97.9858 13.7002C97.4537 13.2367 96.767 13.005 95.9259 13.005C94.2437 13.005 93.1965 13.829 92.7846 15.4769H98.8098Z" fill="currentColor"></path><path d="M80.8408 23.8709C79.5705 23.8709 78.4547 23.5962 77.4934 23.0469C76.5321 22.4976 75.7854 21.7251 75.2533 20.7295C74.7211 19.7167 74.4551 18.5323 74.4551 17.1762C74.4551 15.8201 74.7211 14.6443 75.2533 13.6486C75.7854 12.6359 76.5321 11.8548 77.4934 11.3055C78.4547 10.7562 79.5705 10.4816 80.8408 10.4816C81.6647 10.4816 82.4372 10.6446 83.1581 10.9708C83.8791 11.2969 84.4112 11.7347 84.7545 12.284V5.43481H88.0504V23.6649H84.7545V22.0427C84.4112 22.592 83.8791 23.0383 83.1581 23.3816C82.4372 23.7078 81.6647 23.8709 80.8408 23.8709ZM77.7509 17.1762C77.7509 18.3263 78.0771 19.2704 78.7294 20.0086C79.3817 20.7295 80.2228 21.09 81.2527 21.09C82.2998 21.09 83.141 20.7295 83.7761 20.0086C84.4284 19.2704 84.7545 18.3263 84.7545 17.1762C84.7545 16.0089 84.4284 15.0648 83.7761 14.3439C83.141 13.6229 82.2998 13.2624 81.2527 13.2624C80.2228 13.2624 79.3817 13.6229 78.7294 14.3439C78.0771 15.0648 77.7509 16.0089 77.7509 17.1762Z" fill="currentColor"></path><path d="M66.1152 10.6876H69.3853V12.4385C69.7458 11.8549 70.2694 11.3828 70.956 11.0224C71.6598 10.6619 72.4065 10.4816 73.1961 10.4816C73.7626 10.4816 74.2432 10.5675 74.638 10.7391V13.829C74.1059 13.623 73.5223 13.52 72.8871 13.52C71.8744 13.52 71.0332 13.9663 70.3638 14.8589C69.7115 15.7344 69.3853 17.0304 69.3853 18.747V23.665H66.1152V10.6876Z" fill="currentColor"></path><path d="M57.4172 23.8709C56.0611 23.8709 54.971 23.519 54.1471 22.8152C53.3231 22.1115 52.9111 21.1931 52.9111 20.0601C52.9111 18.7727 53.366 17.7857 54.2758 17.099C55.2028 16.3952 56.6447 15.9403 58.6016 15.7344L61.125 15.4769V15.1936C61.125 14.5242 60.9018 13.992 60.4555 13.5972C60.0092 13.2024 59.417 13.005 58.6788 13.005C57.9922 13.005 57.4257 13.1852 56.9794 13.5457C56.5503 13.9062 56.2928 14.4212 56.207 15.0906H52.9884C53.1085 14.2324 53.4175 13.4513 53.9153 12.7475C54.4303 12.0437 55.0912 11.4944 55.898 11.0996C56.7219 10.6876 57.6489 10.4816 58.6788 10.4816C60.3954 10.4816 61.7773 10.9365 62.8244 11.8463C63.8715 12.7389 64.395 14.0006 64.395 15.6314V23.665H61.125V22.017C60.8331 22.5492 60.3439 22.9955 59.6573 23.356C58.9707 23.6993 58.2239 23.8709 57.4172 23.8709ZM56.1297 19.9314C56.1297 20.3777 56.3014 20.7296 56.6447 20.9871C56.988 21.2446 57.4601 21.3733 58.0609 21.3733C58.9878 21.3733 59.726 21.0558 60.2753 20.4206C60.8417 19.7683 61.125 18.9701 61.125 18.026V17.82L58.7303 18.129C57.8205 18.232 57.1597 18.4294 56.7477 18.7212C56.3357 18.9959 56.1297 19.3993 56.1297 19.9314Z" fill="currentColor"></path><path d="M44.7926 28.5571C43.7284 28.5571 42.7671 28.3683 41.9088 27.9906C41.0505 27.6301 40.3553 27.1237 39.8231 26.4714C39.3082 25.8191 38.9906 25.0896 38.8704 24.2828H42.1148C42.2521 24.8321 42.5697 25.2612 43.0675 25.5702C43.5653 25.8792 44.1747 26.0337 44.8956 26.0337C45.8741 26.0337 46.6637 25.7762 47.2645 25.2612C47.8825 24.7634 48.1915 24.0425 48.1915 23.0984V21.3989C47.8138 21.9139 47.2903 22.3173 46.6208 22.6091C45.9513 22.901 45.2389 23.0469 44.4837 23.0469C43.2477 23.0469 42.1663 22.7894 41.2393 22.2744C40.3124 21.7594 39.6 21.0299 39.1022 20.0858C38.6044 19.1245 38.3555 18.0173 38.3555 16.7642C38.3555 15.4939 38.6044 14.3867 39.1022 13.4426C39.6 12.4985 40.3124 11.7689 41.2393 11.254C42.1663 10.739 43.2477 10.4815 44.4837 10.4815C45.2389 10.4815 45.9513 10.6274 46.6208 10.9192C47.2903 11.1939 47.8138 11.5801 48.1915 12.0779V10.6875H51.4615V22.7894C51.4615 23.991 51.1783 25.0209 50.6118 25.8792C50.0454 26.7547 49.2557 27.4156 48.243 27.8619C47.2473 28.3253 46.0972 28.5571 44.7926 28.5571ZM41.5226 16.7642C41.5226 17.8456 41.8315 18.7297 42.4495 19.4163C43.0675 20.0858 43.8743 20.4205 44.8699 20.4205C45.8483 20.4205 46.6465 20.0858 47.2645 19.4163C47.8825 18.7297 48.1915 17.8456 48.1915 16.7642C48.1915 15.6656 47.8825 14.7815 47.2645 14.1121C46.6465 13.4426 45.8483 13.1079 44.8699 13.1079C43.8743 13.1079 43.0675 13.4426 42.4495 14.1121C41.8315 14.7815 41.5226 15.6656 41.5226 16.7642Z" fill="currentColor"></path><path d="M16.082 0.917969C20.4673 0.917978 24.096 4.15212 24.7158 8.36523C28.9295 8.98456 32.1641 12.6144 32.1641 17C32.1641 21.3856 28.9294 25.0144 24.7158 25.6338C24.0964 29.8474 20.4676 33.082 16.082 33.082C11.6964 33.082 8.06659 29.8474 7.44727 25.6338C3.23415 25.014 8.43986e-06 21.3853 0 17C0 12.6147 3.23408 8.98495 7.44727 8.36523C8.06698 4.15205 11.6967 0.917969 16.082 0.917969ZM13.6289 8.75195V10.5752H11.1719V12.6904H12.2637V21.2256H11.1719V23.3408H13.6289V25.292H15.3008V23.3408H16.2432V25.292H17.9307V23.3213C18.1647 23.3104 18.3996 23.2931 18.5889 23.2676C19.6068 23.0974 20.4185 22.6838 21.0244 22.0273C21.6424 21.3587 21.9521 20.5444 21.9521 19.584C21.9521 18.8303 21.7157 18.1616 21.2432 17.5781C20.7706 16.9946 20.1823 16.6121 19.4795 16.4297C19.9884 16.2352 20.4191 15.8945 20.7705 15.4082C21.1219 14.9098 21.2978 14.3686 21.2979 13.7852C21.2978 12.9828 21.0486 12.3078 20.5518 11.7607C20.067 11.2016 19.4128 10.8372 18.5889 10.667C18.4039 10.6343 18.1676 10.6132 17.9307 10.5996V8.75195H16.2432V10.5752H15.3008V8.75195H13.6289ZM17.3896 17.6143C17.9954 17.6143 18.4922 17.7847 18.8799 18.125C19.2797 18.4532 19.4794 18.8788 19.4795 19.4014C19.4795 19.9363 19.2798 20.3744 18.8799 20.7148C18.4922 21.0552 17.9954 21.2255 17.3896 21.2256H14.7354V17.6143H17.3896ZM17.208 12.6904C17.7047 12.6905 18.1108 12.8308 18.4258 13.1104C18.7527 13.3777 18.9159 13.7241 18.916 14.1494C18.916 14.587 18.7528 14.946 18.4258 15.2256C18.1108 15.493 17.7047 15.6269 17.208 15.627H14.7354V12.6904H17.208Z" fill="currentColor" @click="openGardenFinance"></path></svg>
            <div class="absolute top-0 left-0 transform -translate-x-full bg-[#e5e5e5] border border-gray-300 shadow-lg rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1/2 translate-y-2 whitespace-nowrap text-sm font-medium text-gray-800">
              Garden Finance
            </div>
          </div>
        </div>
      </div>

      <!-- Left Navigation -->
      <nav class="absolute left-8 top-1/2 transform -translate-y-1/2 hidden md:block">
        <div class="flex flex-col gap-y-32">
          <a href="#home" class="text-lg hover:underline cursor-pointer -rotate-90">home</a>
          <a href="#about" class="text-lg hover:underline cursor-pointer -rotate-90">about me</a>
          <a href="#projects" class="text-lg hover:underline cursor-pointer -rotate-90">projects</a>
        </div>
      </nav>

      <!-- Mobile Navigation -->
      <nav class="absolute bottom-8 left-8 md:hidden">
        <div class="flex gap-x-6">
          <a href="#home" class="text-sm hover:underline cursor-pointer">home</a>
          <a href="#about" class="text-sm hover:underline cursor-pointer">about</a>
          <a href="#projects" class="text-sm hover:underline cursor-pointer">projects</a>
        </div>
      </nav>

      <!-- Center Content -->
      <div class="text-center relative px-4">
        <h1 class="text-4xl md:text-6xl dotgothic16-regular tracking-wider break-words">
          {{ displayText }}<span class="animate-pulse">_</span>
        </h1>
        
        <!-- Subtext that appears after animation -->
        <div v-if="showSubtext" class="absolute bottom-0 right-0 transform translate-x-full translate-y-full mt-4 hidden md:block">
          <p class="text-lg dotgothic16-regular opacity-80">if it's code, i'll build it</p>
        </div>
        
        <!-- Mobile Subtext -->
        <div v-if="showSubtext" class="mt-4 md:hidden">
          <p class="text-sm dotgothic16-regular opacity-80">if it's code, i'll build it</p>
        </div>
        
        <!-- GIF that appears when frontend is typed -->
        <div v-if="showGif" class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-full ml-8 hidden md:block">
          <img src="/src/assets/rock_eyebrow.gif" alt="Rock eyebrow raise" class="w-64 h-64 object-contain" />
        </div>
        
        <!-- Mobile GIF -->
        <div v-if="showGif" class="mt-4 md:hidden">
          <img src="/src/assets/rock_eyebrow.gif" alt="Rock eyebrow raise" class="w-32 h-32 object-contain mx-auto" />
        </div>
      </div>

      <!-- Right Side -->
      <div class="absolute right-8 bottom-8">
        <!-- <div class="text-lg cursor-pointer hover:underline">
          dark mode.
        </div> -->
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="min-h-screen p-8">
      <About />
    </section>

    <!-- Projects Section -->
    <section id="projects" class="min-h-screen p-8">
      <Projects />
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
