<script setup>
import { ref } from 'vue';
import { useTypeOnScroll } from '../composables/useTypeOnScroll';

const headingRef = ref(null);
const { displayed, done } = useTypeOnScroll(headingRef, '_about', { speed: 80 });
</script>

<template>
  <div class="about-container">
    <div class="header" ref="headingRef">
      <h1 class="about-title dotgothic16-regular">
        {{ displayed }}<span v-if="done" class="cursor">_</span>
      </h1>
    </div>

    <div class="profile-section">
      <h2 class="name dotgothic16-regular">Raagan U</h2>
      <p class="bio">
        The name's Raagan. You can also call me a potential candidate for your next project :)<br />
        I code, and I solve problems through code. You can also count on me for DB optimizations, devops.
      </p>
      <div class="social-links">
        <a href="https://www.instagram.com/_raagan" class="social-link" target="_blank">
          <img src="../assets/social/instagram.png" alt="Instagram" class="social-icon" />
        </a>
        <a href="https://github.com/raagan-u" class="social-link" target="_blank">
          <img src="../assets/social/github.png" alt="Github" class="social-icon" />
        </a>
        <a href="mailto:raaganuthayaargn@gmail.com" class="social-link">
          <img src="../assets/social/gmail.png" alt="Email" class="social-icon" />
        </a>
        <a href="https://in.linkedin.com/in/raagan-u-01a170203" class="social-link" target="_blank">
          <img src="../assets/social/linkedin.png" alt="Linkedin" class="social-icon" />
        </a>
      </div>
    </div>

    <hr class="block-divider" />

    <div class="flat-row">
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">backend</h3>
        <p class="flat-description">Backend development with Rust, Go, etc.</p>
      </div>
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">blockchain</h3>
        <p class="flat-description">Solidity, Bitcoin scripts, Lightning Network.</p>
      </div>
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">adaptive learning</h3>
        <p class="flat-description">
          Give me a topic and a deadline — I'll learn it fast, then I'll get better at it every day.
        </p>
      </div>
    </div>

    <hr class="block-divider" />

    <div class="flat-row">
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">i've had experiences with</h3>
        <div class="tech-grid">
          <img src="../assets/tech_stack/react.png" alt="React" class="tech-logo" />
          <img src="../assets/tech_stack/mongo.png" alt="MongoDB" class="tech-logo" />
          <img src="../assets/tech_stack/python.ico" alt="Python" class="tech-logo" />
          <img src="../assets/tech_stack/ts.png" alt="TypeScript" class="tech-logo" />
          <img src="../assets/tech_stack/vue.png" alt="Vue" class="tech-logo" />
        </div>
      </div>
      <div class="flat-block">
        <h3 class="flat-title dotgothic16-regular">currently getting better at</h3>
        <div class="tech-grid">
          <img src="../assets/current/rust.png" alt="Rust" class="tech-logo" />
          <img src="../assets/current/go.svg" alt="Go" class="tech-logo" />
          <img src="../assets/current/solidity.ico" alt="Solidity" class="tech-logo" />
          <img src="../assets/current/icons8-bitcoin-500.png" alt="Bitcoin" class="tech-logo" />
          <img src="../assets/current/postgres.png" alt="PostgreSQL" class="tech-logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Courier New', monospace;
  color: var(--fg);
  background: var(--bg);
}

.header {
  margin-bottom: 3rem;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0;
  color: var(--fg);
}

.cursor {
  animation: blink 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.profile-section {
  margin-bottom: 3rem;
}

.name {
  font-size: 2.5rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
  color: var(--fg);
}

.bio {
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  color: var(--fg);
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  text-decoration: none;
  color: var(--fg);
  height: 40px;
  width: 40px;
  transition: opacity 0.2s;
}

.social-link:hover {
  opacity: 0.6;
}

.social-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.block-divider {
  border: 0;
  border-top: 1px dashed var(--border);
  margin: 3rem 0;
}

.flat-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.flat-block {
  padding: 0;
}

.flat-title {
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 0 0.8rem 0;
  color: var(--fg);
}

.flat-description {
  font-size: 0.95rem;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.tech-logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.tech-logo:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .social-links {
    justify-content: flex-start;
  }
  .flat-row {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
