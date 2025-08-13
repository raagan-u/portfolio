<script setup>
// Project data
const projects = [
  {
    id: 1,
    title: "Particle-PartiSync",
    description: "Particle - an ERC20 with blacklisting and whitelisting, PartiSync - a subscription smart contract",
    image: "/src/assets/particle-partisync-preview.png",
    tech: ["Solidity"],
    github: "https://github.com/raagan-u/particle-partisync",
    live: "#",
    featured: true
  },
  {
    id: 2,
    title: "Garden-TUI",
    description: "A TUI for the Garden Finance API.",
    image: "/src/assets/garden-tui-preview.png",
    tech: ["Rust", "Bitcoin", "Ratatui", "Alloy"],
    github: "https://github.com/raagan-u/garden-tui",
    live: "#",
    featured: true
  },
  {
    id: 3,
    title: "Wallet-rs",
    description: "A blockchain wallet in rust.",
    image: "/src/assets/wallet-rs-preview.png",
    tech: ["Rust", "Bitcoin", "Alloy"],
    github: "https://github.com/raagan-u/wallet-rs",
    live: "#",
    featured: false
  }
]

const contributions = [
  {
    id: 1,
    title: "Merry",
    description: "multi-blockchain testing environment",
    image: "/src/assets/merry-preview.png",
    tech: ["Docker", "Go"],
    github: "https://github.com/raagan-u/merry",
    live: "#",
    featured: false
  }
]
</script>

<template>
  <div class="projects-container">
    <!-- Header -->
    <div class="header">
      <h1 class="projects-title">projects</h1>
      <div class="title-underline"></div>
    </div>

    <!-- Featured Projects -->
    <div class="featured-section">
      <h2 class="section-title">Featured Projects</h2>
      <div class="featured-grid">
        <div 
          v-for="project in projects.filter(p => p.featured)" 
          :key="project.id" 
          class="project-card featured"
        >
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="tech-stack">
              <span 
                v-for="tech in project.tech" 
                :key="tech" 
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            <div class="project-links">
              <a :href="project.github" class="project-link github" target="_blank">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- All Projects -->
    <div class="all-projects-section">
      <h2 class="section-title">All Projects</h2>
      <div class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="project-card"
        >
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="tech-stack">
              <span 
                v-for="tech in project.tech" 
                :key="tech" 
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            <div class="project-links">
              <a :href="project.github" class="project-link github" target="_blank">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contributions -->
    <div class="contributions-section">
      <h2 class="section-title">Contributions</h2>
      <div class="contributions-grid">
        <div 
          v-for="contribution in contributions" 
          :key="contribution.id" 
          class="project-card"
        >
          <div class="project-content">
            <h3 class="project-title">{{ contribution.title }}</h3>
            <p class="project-description">{{ contribution.description }}</p>
            <div class="tech-stack">
              <span 
                v-for="tech in contribution.tech" 
                :key="tech" 
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            <div class="project-links">
              <a :href="contribution.github" class="project-link github" target="_blank">
                GitHub
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #000;
  background: #fff;
}

.header {
  margin-bottom: 3rem;
}

.projects-title {
  font-size: 2.5rem;
  font-weight: 400;
  text-transform: lowercase;
  margin: 0;
  margin-bottom: 0.5rem;
}

.title-underline {
  width: 60px;
  height: 2px;
  background: #000;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0 0 2rem 0;
  color: #000;
}

.featured-section {
  margin-bottom: 4rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #f0f0f0;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.project-card.featured {
  border: 2px solid #000;
}

.project-image {
  height: 200px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.8rem 0;
  color: #000;
}

.project-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #666;
  margin: 0 0 1.2rem 0;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: #f0f0f0;
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid #e0e0e0;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid;
}

.project-link.github {
  background: #000;
  color: #fff;
  border-color: #000;
}

.project-link.github:hover {
  background: #333;
  border-color: #333;
}

.project-link.live {
  background: transparent;
  color: #000;
  border-color: #000;
}

.project-link.live:hover {
  background: #000;
  color: #fff;
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
    font-size: 1.5rem;
  }
}
</style>