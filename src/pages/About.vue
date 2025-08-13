<script setup>
// Component logic can be added here if needed
</script>

<template>
  <div class="about-container">
    <!-- Header -->
    <div class="header">
      <h1 class="about-title">about me</h1>
      <div class="title-underline"></div>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
      <div class="profile-content">
        <div class="profile-info">
          <h2 class="name">Raagan U</h2>
          <p class="bio">
            Yeah, My name is Raagan. You can also call me as potential candidate for your next project :)<br></br>
            I code, and I solve problems through code.
          </p>
          <div class="social-links">
            <a href="https://www.instagram.com/_raagan" class="social-link"><img src="../assets/social/instagram.png" alt="Instagram" class="social-icon"></img></a>
            <a href="https://github.com/raagan-u" class="social-link"><img src="../assets/social/github.png" alt="Github" class="social-icon"></img></a>
            <a href="mailto:raaganuthayaargn@gmail.com" class="social-link"><img src="../assets/social/gmail.png" alt="Email" class="social-icon"></img></a>
            <a href="https://in.linkedin.com/in/raagan-u-01a170203" class="social-link"><img src="../assets/social/linkedin.png" alt="Linkedin" class="social-icon"></img></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills Cards Row 1 -->
    <div class="skills-row">
      <div class="skill-card">
        <div class="skill-icon"></div>
        <h3 class="skill-title">Backend</h3>
        <p class="skill-description">Backend development with Rust, Go, etc.</p>
      </div>
      <div class="skill-card">
        <div class="skill-icon"></div>
        <h3 class="skill-title">Blockchain</h3>
        <p class="skill-description">Solidity, Bitcoin scripts, Lightning Network.</p>
      </div>
      <div class="skill-card">
        <div class="skill-icon"></div>
        <h3 class="skill-title">Adaptive Learning</h3>
        <p class="skill-description">
          Give me a topic and a deadline — I’ll learn it fast, then I'll get better at it every day.
        </p>
      </div>
    </div>

    <!-- Experience Cards Row 2 -->
    <div class="experience-row">
      <div class="experience-card">
        <h3 class="experience-title">I've had experiences with</h3>
        <div class="tech-grid">
          <img src="../assets/tech_stack/react.png" alt="React" class="tech-logo">
          <img src="../assets/tech_stack/mongo.png" alt="MongoDB" class="tech-logo">
          <img src="../assets/tech_stack/python.ico" alt="Python" class="tech-logo">
          <img src="../assets/tech_stack/ts.png" alt="TypeScript" class="tech-logo">
          <img src="../assets/tech_stack/vue.png" alt="Vue" class="tech-logo">
        </div>
      </div>
      <div class="experience-card">
        <h3 class="experience-title">Currently getting better at</h3>
        <div class="tech-grid">
          <img src="../assets/current/rust.png" alt="Rust" class="tech-logo">
          <img src="../assets/current/go.svg" alt="Go" class="tech-logo">
          <img src="../assets/current/solidity.ico" alt="Solidity" class="tech-logo">
          <img src="../assets/current/icons8-bitcoin-500.png" alt="Bitcoin" class="tech-logo">
          <img src="../assets/current/postgres.png" alt="PostgreSQL" class="tech-logo">
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #000;
  background: #fff;
}

.header {
  margin-bottom: 3rem;
}

.about-title {
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

.profile-section {
  margin-bottom: 4rem;
}

.profile-content {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.profile-image {
  flex-shrink: 0;
}

.pixel-portrait {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.pixel-art {
  width: 80px;
  height: 80px;
  position: relative;
}

.head {
  width: 60px;
  height: 60px;
  background: #8B4513;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
}

.eyes {
  width: 20px;
  height: 8px;
  background: #000;
  border-radius: 4px;
  position: absolute;
  top: 25px;
  left: 20px;
}

.eyes::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 8px;
  background: #000;
  border-radius: 4px;
  right: -25px;
}

.beard {
  width: 50px;
  height: 20px;
  background: #654321;
  border-radius: 10px;
  position: absolute;
  bottom: 15px;
  left: 15px;
}

.mustache {
  width: 40px;
  height: 8px;
  background: #654321;
  border-radius: 4px;
  position: absolute;
  bottom: 25px;
  left: 20px;
}

.profile-info {
  flex: 1;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.bio {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  color: #333;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  text-decoration: none;
  color: #000;
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s;
  height: 40px;
  width: 40px;
}

.social-link:hover {
  opacity: 0.7;
}

.skills-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.skill-card {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
}

.skill-card:hover {
  transform: translateY(-2px);
}

.skill-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.skill-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.skill-description {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.experience-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.experience-card {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
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

.experience-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #000;
}



@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .skills-row,
  .experience-row {
    grid-template-columns: 1fr;
  }
}
</style>