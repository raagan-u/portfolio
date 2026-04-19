<script setup>
import { ref } from 'vue';
import { useTypeOnScroll } from '../composables/useTypeOnScroll';

const headingRef = ref(null);
const { displayed, done } = useTypeOnScroll(headingRef, '_projects', { speed: 80 });

const projects = [
  {
    id: 1,
    title: "Particle-PartiSync",
    description: "Particle - an ERC20 with blacklisting and whitelisting, PartiSync - a subscription smart contract",
    tech: ["Solidity"],
    github: "https://github.com/raagan-u/particle-partisync",
    featured: true,
    contracts: [
      {
        name: "Particle Token",
        address: "0x733E0CF1fFcBdB93f456e1317Ec8306F8acea404",
        network: "Arbitrum Sepolia",
        explorer: "https://sepolia.arbiscan.io/address/"
      },
      {
        name: "PartiSync",
        address: "0x4fe06c9d281F66a2D9849d60ACa9ef4c506B4d7A",
        network: "Arbitrum Sepolia",
        explorer: "https://sepolia.arbiscan.io/address/"
      }
    ]
  },
  {
    id: 2,
    title: "Garden-TUI",
    description: "A TUI for the Garden Finance API.",
    tech: ["Rust", "Bitcoin", "Ratatui", "Alloy"],
    github: "https://github.com/raagan-u/garden-tui",
    featured: true
  },
  {
    id: 3,
    title: "Wallet-rs",
    description: "A blockchain wallet in rust.",
    tech: ["Rust", "Bitcoin", "Alloy"],
    github: "https://github.com/raagan-u/wallet-rs",
    featured: false
  }
];

const contributions = [
  {
    id: 1,
    title: "Merry",
    description: "multi-blockchain testing environment",
    tech: ["Docker", "Go"],
    github: "https://github.com/raagan-u/merry",
    featured: false
  }
];
</script>

<template>
  <div class="projects-container">
    <div class="header" ref="headingRef">
      <h1 class="projects-title dotgothic16-regular">
        {{ displayed }}<span v-if="done" class="cursor">_</span>
      </h1>
    </div>

    <div class="section">
      <h2 class="section-title dotgothic16-regular">_featured projects</h2>
      <div class="featured-grid">
        <div
          v-for="project in projects.filter(p => p.featured)"
          :key="project.id"
          class="project-card featured"
        >
          <div class="project-content">
            <h3 class="project-title dotgothic16-regular">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in project.tech" :key="tech" class="tech-tag">
                [{{ tech.toLowerCase() }}]
              </span>
            </div>
            <div class="project-links">
              <a :href="project.github" class="project-link" target="_blank">
                &gt; github
              </a>
            </div>

            <div v-if="project.contracts" class="contract-addresses">
              <h4 class="contract-title">deployed contracts:</h4>
              <div class="contract-list">
                <div
                  v-for="contract in project.contracts"
                  :key="contract.name"
                  class="contract-item"
                >
                  <span class="contract-name">{{ contract.name }}:</span>
                  <a
                    :href="`${contract.explorer}${contract.address}`"
                    class="contract-link"
                    target="_blank"
                  >
                    {{ contract.address }}
                  </a>
                  <span class="contract-network">({{ contract.network }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title dotgothic16-regular">_all projects</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-content">
            <h3 class="project-title dotgothic16-regular">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in project.tech" :key="tech" class="tech-tag">
                [{{ tech.toLowerCase() }}]
              </span>
            </div>
            <div class="project-links">
              <a :href="project.github" class="project-link" target="_blank">
                &gt; github
              </a>
            </div>

            <div v-if="project.contracts" class="contract-addresses">
              <h4 class="contract-title">deployed contracts:</h4>
              <div class="contract-list">
                <div
                  v-for="contract in project.contracts"
                  :key="contract.name"
                  class="contract-item"
                >
                  <span class="contract-name">{{ contract.name }}:</span>
                  <a
                    :href="`${contract.explorer}${contract.address}`"
                    class="contract-link"
                    target="_blank"
                  >
                    {{ contract.address }}
                  </a>
                  <span class="contract-network">({{ contract.network }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title dotgothic16-regular">_contributions</h2>
      <div class="projects-grid">
        <div
          v-for="contribution in contributions"
          :key="contribution.id"
          class="project-card"
        >
          <div class="project-content">
            <h3 class="project-title dotgothic16-regular">{{ contribution.title }}</h3>
            <p class="project-description">{{ contribution.description }}</p>
            <div class="tech-stack">
              <span v-for="tech in contribution.tech" :key="tech" class="tech-tag">
                [{{ tech.toLowerCase() }}]
              </span>
            </div>
            <div class="project-links">
              <a :href="contribution.github" class="project-link" target="_blank">
                &gt; github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-container {
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

.projects-title {
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

.section {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 0 2rem 0;
  color: var(--fg);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--bg);
  border: 1px solid var(--border);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.project-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--shadow);
}

.project-card.featured {
  border-width: 2px;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0 0 0.8rem 0;
  color: var(--fg);
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--muted);
  margin: 0 0 1.2rem 0;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  color: var(--fg);
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  text-decoration: none;
  color: var(--fg);
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  padding: 0;
  border: 0;
  background: transparent;
}

.project-link:hover {
  text-decoration: underline;
}

.contract-addresses {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border);
}

.contract-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--fg);
}

.contract-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.contract-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  flex-wrap: wrap;
}

.contract-name {
  color: var(--muted);
  min-width: fit-content;
}

.contract-link {
  color: var(--fg);
  text-decoration: none;
  font-family: monospace;
  word-break: break-all;
}

.contract-link:hover {
  text-decoration: underline;
}

.contract-network {
  color: var(--muted);
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .featured-grid,
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .project-card {
    margin-bottom: 1rem;
  }
  .projects-title {
    font-size: 2rem;
  }
  .section-title {
    font-size: 1.2rem;
  }
}
</style>
