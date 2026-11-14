<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const root = ref(null);
let observer;
let previousTitle;

onMounted(() => {
  previousTitle = document.title;
  document.title = 'FroMH — From My Heart';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    root.value?.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  root.value?.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
});

onUnmounted(() => {
  observer?.disconnect();
  document.title = previousTitle || 'Raagan U';
});
</script>

<template>
  <main ref="root" class="fromh-page">
    <header class="site-header" aria-label="FroMH navigation">
      <RouterLink to="/" class="wordmark" aria-label="FroMH home">
        <span>Fro</span><em>MH</em>
      </RouterLink>
      <p class="header-note">From My Heart</p>
      <RouterLink to="/" class="back-link">
        <span aria-hidden="true">&#8592;</span> Raagan's portfolio
      </RouterLink>
    </header>

    <section class="hero">
      <div class="hero-index" data-reveal>
        <span>Independent products</span>
        <span>Est. 2026</span>
      </div>

      <div class="hero-copy" data-reveal>
        <p class="eyebrow">A continuing collection</p>
        <h1>
          Things I build because
          <span>I want them to exist.</span>
        </h1>
      </div>

      <div class="hero-mark" aria-hidden="true" data-reveal>
        <svg viewBox="0 0 260 260" role="presentation">
          <circle cx="130" cy="130" r="112" />
          <circle cx="130" cy="130" r="88" />
          <path d="M60 130h140M130 60v140" />
          <text x="130" y="124">FMH</text>
          <text x="130" y="150">01—∞</text>
        </svg>
      </div>

      <div class="hero-intro" data-reveal>
        <span class="drop-cap">F</span>
        <p>
          roMH stands for <em>From My Heart</em>. It is a series of products shaped by
          curiosity, conviction, and the simple feeling that something ought to exist in
          the world.
        </p>
      </div>

      <p class="scroll-note" aria-hidden="true">Scroll to explore <span>&#8595;</span></p>
    </section>

    <section class="collection" aria-labelledby="collection-title">
      <div class="section-heading" data-reveal>
        <p class="eyebrow">The collection</p>
        <h2 id="collection-title">Made personally.<br />Shared openly.</h2>
        <p>Not client work. Not a list of experiments. Products I intend to keep caring for.</p>
      </div>

      <article class="product product--strings" data-reveal>
        <div class="product-meta">
          <span>FMH—01</span>
          <span class="status"><i></i> Live</span>
        </div>

        <div class="product-visual strings-visual" aria-label="TwelveStrings wordmark over an abstract guitar fretboard">
          <div class="strings">
            <i v-for="n in 12" :key="n"></i>
          </div>
          <div class="twelve-brand">
            <span class="twelve-roman">XII</span>
            <span class="twelve-name">
              <strong>twelvestrings</strong>
              <small>A little more play.</small>
            </span>
          </div>
          <div class="riff-meter" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
          <p><span>&#10035;</span> two people / six strings each</p>
        </div>

        <div class="product-copy">
          <p class="product-kind">Play together</p>
          <h3>TwelveStrings</h3>
          <p class="product-description">
            A guitar web app where two people can join and jam together—with more ways
            to play on the way.
          </p>
          <a href="https://twelvestrings.xyz/" target="_blank" rel="noopener noreferrer" class="visit-link">
            Visit TwelveStrings <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </article>

      <article class="product product--ctrld" data-reveal>
        <div class="product-meta">
          <span>FMH—02</span>
          <span class="status status--beta"><i></i> Live · Android beta</span>
        </div>

        <div class="product-visual pact-visual" aria-label="Animated interpretation of the ctrld app opening splash">
          <div class="ctrld-rings" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="pact-paper">
            <div class="pact-head">
              <span>The app opens with intent</span>
              <span>01 — 03</span>
            </div>
            <div class="ctrld-splash">
              <div class="ctrld-logo" aria-label="ctrld">
                <span style="--letter: 0">c</span><span style="--letter: 1">t</span><span style="--letter: 2">r</span><span style="--letter: 3">l</span><span style="--letter: 4">d</span><i aria-hidden="true">_</i>
              </div>
              <div class="ctrld-splash-entry">
                <p class="ctrld-pronunciation">/kənˈtroʊld/ <i>·</i> kuhn-TROHLD</p>
                <p class="ctrld-definition"><b>adj.</b> a wallet that <em>actually</em><br />helps you stick to your budget.</p>
              </div>
            </div>
            <div class="ctrld-steps">Type. Define. Commit.</div>
          </div>
        </div>

        <div class="product-copy">
          <p class="product-kind">Keep your word</p>
          <h3>ctrld</h3>
          <p class="product-description">
            A wallet that helps people keep the financial promises they make to themselves—with
            spending pacts, stakes, and trusted accountability before money moves.
          </p>
          <a href="https://tryctrld.xyz/" target="_blank" rel="noopener noreferrer" class="visit-link">
            Discover ctrld <span aria-hidden="true">&#8599;</span>
          </a>
        </div>
      </article>

      <article class="product product--unknown" data-reveal>
        <div class="product-meta">
          <span>FMH—03</span>
          <span class="status status--quiet"><i></i> Taking shape</span>
        </div>

        <div class="product-visual unknown-visual" aria-hidden="true">
          <div class="sealed-card">
            <span>From the desk of</span>
            <strong>R.</strong>
            <div class="seal">03</div>
          </div>
        </div>

        <div class="product-copy">
          <p class="product-kind">The next chapter</p>
          <h3>Untitled, for now.</h3>
          <p class="product-description">
            The third product is currently being built. It will be shared when it is ready
            to speak for itself.
          </p>
          <span class="coming-soon">Currently in the workshop</span>
        </div>
      </article>
    </section>

    <section class="manifesto" data-reveal>
      <p class="eyebrow">A note to self</p>
      <blockquote>
        “The most personal<br />is the most creative.”
      </blockquote>
      <p class="attribution">Martin Scorsese, as quoted by Bong Joon-ho</p>
      <div class="manifesto-note">
        <p>
          Build with care. Keep the idea clear. Put it in people's hands.
        </p>
        <span>— the FroMH principle</span>
      </div>
    </section>

    <footer class="fromh-footer">
      <div>
        <span class="footer-mark">Fro<em>MH</em></span>
        <p>From My Heart, by Raagan.</p>
      </div>
      <div class="footer-links">
        <RouterLink to="/">Portfolio</RouterLink>
        <a href="mailto:raaganuthayaargn@gmail.com">Write to me</a>
      </div>
      <p class="footer-year">MMXXVI</p>
    </footer>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500&display=swap');

.fromh-page {
  --paper: #f1eadc;
  --paper-deep: #e5dac7;
  --ink: #211d18;
  --soft-ink: #62594d;
  --rule: #c9bca8;
  --red: #873d34;
  --olive: #5e6750;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  color: var(--ink);
  background-color: var(--paper);
  background-image: radial-gradient(rgba(66, 51, 36, 0.07) 0.55px, transparent 0.55px);
  background-size: 5px 5px;
  font-family: 'DM Sans', Arial, sans-serif;
}

.fromh-page::selection {
  color: var(--paper);
  background: var(--red);
}

.site-header {
  width: min(1440px, calc(100% - 64px));
  min-height: 96px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid var(--rule);
}

.wordmark,
.footer-mark {
  color: var(--ink);
  font-family: 'Newsreader', Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -0.06em;
  text-decoration: none;
}

.wordmark em,
.footer-mark em {
  color: var(--red);
  font-style: italic;
}

.header-note {
  color: var(--soft-ink);
  font-family: 'Newsreader', Georgia, serif;
  font-size: 0.92rem;
  font-style: italic;
  letter-spacing: 0.05em;
}

.back-link {
  justify-self: end;
  color: var(--ink);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-decoration: none;
  text-transform: uppercase;
}

.back-link span {
  display: inline-block;
  margin-right: 8px;
  transition: transform 180ms ease;
}

.back-link:hover span { transform: translateX(-4px); }

.hero {
  position: relative;
  min-height: calc(100vh - 96px);
  width: min(1440px, calc(100% - 64px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 280px;
  grid-template-rows: auto 1fr auto;
  column-gap: 7vw;
  padding: 44px 0 56px;
}

.hero-index {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  color: var(--soft-ink);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero-copy {
  align-self: center;
  max-width: 970px;
  padding: 7vh 0;
}

.eyebrow,
.product-kind {
  margin-bottom: 24px;
  color: var(--red);
  font-size: 0.67rem;
  font-weight: 600;
  letter-spacing: 0.19em;
  text-transform: uppercase;
}

.hero h1,
.section-heading h2,
.product-copy h3,
.manifesto blockquote {
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 300;
}

.hero h1 {
  max-width: 1050px;
  font-size: clamp(4.3rem, 8.2vw, 8.5rem);
  line-height: 0.87;
  letter-spacing: -0.065em;
}

.hero h1 span {
  display: block;
  margin-left: 8vw;
  color: var(--red);
  font-style: italic;
  white-space: nowrap;
}

.hero-mark {
  align-self: center;
  justify-self: end;
  width: min(20vw, 250px);
}

.hero-mark svg {
  width: 100%;
  animation: slow-turn 36s linear infinite;
}

.hero-mark circle,
.hero-mark path {
  fill: none;
  stroke: var(--rule);
  stroke-width: 1;
}

.hero-mark text {
  fill: var(--soft-ink);
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-anchor: middle;
}

.hero-intro {
  grid-column: 1;
  display: flex;
  max-width: 650px;
  align-items: flex-start;
  border-top: 1px solid var(--rule);
  padding-top: 24px;
}

.hero-intro p {
  max-width: 560px;
  color: var(--soft-ink);
  font-family: 'Newsreader', Georgia, serif;
  font-size: 1.15rem;
  line-height: 1.55;
}

.hero-intro em { color: var(--ink); }

.drop-cap {
  margin: -7px 15px 0 0;
  color: var(--red);
  font-family: 'Newsreader', Georgia, serif;
  font-size: 4.4rem;
  line-height: 1;
}

.scroll-note {
  align-self: end;
  justify-self: end;
  color: var(--soft-ink);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.scroll-note span { margin-left: 10px; }

.collection {
  width: min(1440px, calc(100% - 64px));
  margin: 0 auto;
  padding: 140px 0 80px;
  border-top: 1px solid var(--rule);
}

.section-heading {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: end;
  margin-bottom: 140px;
}

.section-heading .eyebrow {
  grid-column: 1 / -1;
}

.section-heading h2 {
  font-size: clamp(3.4rem, 6vw, 6.5rem);
  line-height: 0.94;
  letter-spacing: -0.055em;
}

.section-heading > p:last-child {
  max-width: 390px;
  justify-self: end;
  color: var(--soft-ink);
  font-family: 'Newsreader', Georgia, serif;
  font-size: 1.15rem;
  line-height: 1.55;
}

.product {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  grid-template-rows: auto 1fr;
  gap: 0 8vw;
  min-height: 760px;
  padding: 28px 0 120px;
  margin-bottom: 92px;
  border-top: 1px solid var(--ink);
}

.product-meta {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 42px;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.status i {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--olive);
  box-shadow: 0 0 0 4px rgba(94, 103, 80, 0.14);
}

.status--beta i { background: #25c995; box-shadow: 0 0 0 4px rgba(37, 201, 149, 0.14); }
.status--quiet i { background: var(--soft-ink); box-shadow: none; }

.product-visual {
  position: relative;
  min-height: 580px;
  overflow: hidden;
  background: var(--paper-deep);
}

.product-copy {
  align-self: center;
  max-width: 500px;
}

.product-copy h3 {
  margin-bottom: 32px;
  font-size: clamp(3.8rem, 6vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.065em;
}

.product-description {
  margin-bottom: 44px;
  color: var(--soft-ink);
  font-family: 'Newsreader', Georgia, serif;
  font-size: clamp(1.25rem, 1.65vw, 1.6rem);
  line-height: 1.5;
}

.visit-link {
  display: inline-flex;
  gap: 28px;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--ink);
  color: var(--ink);
  font-size: 0.69rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease, gap 180ms ease;
}

.visit-link:hover { gap: 38px; color: var(--red); }

.strings-visual {
  display: grid;
  place-items: center;
  color: #e7e8df;
  background-color: #1b1e1a;
  background-image: linear-gradient(rgba(140, 152, 124, 0.2) 1px, transparent 1px);
  background-size: 100% 68px;
}

.strings {
  position: absolute;
  inset: 0 8%;
  display: flex;
  justify-content: space-between;
}

.strings i {
  width: 1px;
  height: 100%;
  background: rgba(140, 152, 124, 0.25);
  transform-origin: center;
  transition: transform 400ms ease;
}

.strings-visual:hover .strings i:nth-child(3n + 1) { transform: scaleX(3); }
.strings-visual:hover .strings i:nth-child(3n + 2) { transform: translateX(2px); }

.twelve-brand {
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 19px;
  padding: 30px 36px 27px;
  border: 1px solid rgba(174, 188, 155, 0.28);
  background: rgba(27, 30, 26, 0.9);
  box-shadow: 14px 14px 0 rgba(0, 0, 0, 0.18);
}

.twelve-roman {
  color: #f3a47e;
  font-family: 'Newsreader', Georgia, serif;
  font-size: 4.5rem;
  font-weight: 500;
  line-height: 0.8;
  letter-spacing: -0.06em;
}

.twelve-name { display: flex; flex-direction: column; align-items: flex-start; }
.twelve-name strong { font-size: 1.4rem; letter-spacing: -0.04em; }
.twelve-name small { margin-top: 8px; color: #aebc9b; font-size: 0.54rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; }

.riff-meter {
  position: absolute;
  top: 32px;
  right: 32px;
  z-index: 1;
  height: 22px;
  display: flex;
  align-items: end;
  gap: 4px;
}

.riff-meter i { width: 9px; background: #aebc9b; }
.riff-meter i:nth-child(1) { height: 5px; }
.riff-meter i:nth-child(2) { height: 10px; }
.riff-meter i:nth-child(3) { height: 7px; }
.riff-meter i:nth-child(4) { height: 16px; }
.riff-meter i:nth-child(5) { height: 5px; }

.strings-visual > p {
  position: absolute;
  bottom: 25px;
  left: 28px;
  color: #aebc9b;
  font-size: 0.59rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.strings-visual > p span { margin-right: 10px; color: #f3a47e; }

.product--ctrld .product-visual { grid-column: 2; }
.product--ctrld .product-copy { grid-column: 1; grid-row: 2; }

.pact-visual {
  display: grid;
  place-items: center;
  padding: 8%;
  background: #1754eb;
}

.ctrld-rings,
.ctrld-rings i {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
}

.ctrld-rings { width: 520px; aspect-ratio: 1; top: -160px; right: -170px; }
.ctrld-rings i:nth-child(1) { inset: 12%; }
.ctrld-rings i:nth-child(2) { inset: 27%; }
.ctrld-rings i:nth-child(3) { inset: 42%; }

.pact-paper { transition: transform 350ms ease; }

.pact-paper {
  position: relative;
  z-index: 1;
  width: auto;
  height: min(88%, 540px);
  aspect-ratio: 9 / 18.5;
  padding: 27px 23px 31px;
  overflow: hidden;
  color: #182235;
  background: #fff;
  border: 4px solid #182235;
  border-radius: 38px;
  box-shadow: 15px 19px 0 rgba(9, 32, 88, 0.22);
  transform: rotate(1.2deg);
}

.pact-paper::after {
  content: '';
  position: absolute;
  right: -120px;
  bottom: -155px;
  width: 350px;
  aspect-ratio: 1;
  border: 38px solid #dbe5ff;
  border-radius: 50%;
  box-shadow: 0 0 0 50px #eff3ff;
}

.pact-visual:hover .pact-paper { transform: rotate(0deg) translateY(-4px); }

.pact-head {
  display: flex;
  justify-content: space-between;
  color: #687289;
  font-size: 0.42rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.ctrld-splash {
  position: relative;
  z-index: 1;
  min-height: 330px;
}

.ctrld-logo {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: baseline;
  margin-top: 74px;
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.08em;
  animation: ctrld-word-shift 7.8s ease-in-out infinite;
}

.ctrld-logo span {
  display: inline-block;
  opacity: 0;
  animation: ctrld-letter 7.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
  animation-delay: calc(0.16s + (var(--letter) * 0.12s));
}

.ctrld-logo > i {
  margin-left: 2px;
  color: #1754eb;
  font-size: 0.8em;
  font-style: normal;
  animation: ctrld-caret 0.7s steps(1, end) infinite;
}

.ctrld-definition em { color: #1754eb; font-style: normal; }
.ctrld-splash-entry { opacity: 0; animation: ctrld-entry 7.8s ease-in-out 1.05s infinite; }
.ctrld-pronunciation { position: relative; z-index: 1; margin-top: 12px; color: #687289; font-size: 0.5rem; font-weight: 500; }
.ctrld-pronunciation i { margin: 0 5px; font-style: normal; }
.ctrld-definition { position: relative; z-index: 1; margin-top: 26px; font-size: 0.8rem; font-weight: 600; line-height: 1.28; }
.ctrld-definition b { display: block; margin-bottom: 8px; color: #1754eb; font-size: 0.58rem; }
.ctrld-steps { position: absolute; z-index: 1; left: 23px; bottom: 24px; color: #687289; font-size: 0.42rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; }

@keyframes ctrld-letter {
  0%, 2% { opacity: 0; transform: translateY(16px); }
  8%, 79% { opacity: 1; transform: none; }
  90%, 100% { opacity: 0; transform: translateY(-8px); }
}

@keyframes ctrld-word-shift {
  0%, 14% { transform: translateY(88px) scale(1.05); }
  26%, 80% { transform: none; }
  92%, 100% { transform: translateY(-10px); }
}

@keyframes ctrld-entry {
  0%, 7% { opacity: 0; transform: translateY(16px); }
  17%, 73% { opacity: 1; transform: none; }
  84%, 100% { opacity: 0; transform: translateY(-8px); }
}

@keyframes ctrld-caret {
  0%, 48% { opacity: 1; }
  49%, 100% { opacity: 0; }
}

.unknown-visual {
  display: grid;
  place-items: center;
  padding: 11%;
  background: var(--red);
}

.sealed-card {
  position: relative;
  width: min(100%, 460px);
  aspect-ratio: 1.42;
  padding: 32px;
  border: 1px solid rgba(241, 234, 220, 0.42);
  color: var(--paper);
  background: rgba(78, 26, 24, 0.17);
}

.sealed-card::before,
.sealed-card::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 70.8%;
  height: 1px;
  background: rgba(241, 234, 220, 0.4);
  transform-origin: left;
}

.sealed-card::before { transform: rotate(-35deg); }
.sealed-card::after { left: auto; right: 0; transform: rotate(35deg); transform-origin: right; }
.sealed-card span { font-size: 0.59rem; font-weight: 600; letter-spacing: 0.17em; text-transform: uppercase; }
.sealed-card strong { display: block; margin-top: 18px; font-family: 'Newsreader', Georgia, serif; font-size: 5rem; font-weight: 300; font-style: italic; }
.seal { position: absolute; z-index: 2; left: 50%; bottom: 18%; width: 76px; aspect-ratio: 1; display: grid; place-items: center; border-radius: 50%; color: var(--red); background: var(--paper); font-family: 'Newsreader', Georgia, serif; font-size: 1.8rem; box-shadow: 0 4px 12px rgba(48, 15, 12, 0.25); transform: translateX(-50%); }

.coming-soon { color: var(--red); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }

.manifesto {
  width: min(1440px, calc(100% - 64px));
  margin: 0 auto;
  padding: 140px 0 150px;
  border-top: 1px solid var(--rule);
}

.manifesto blockquote {
  max-width: 1100px;
  margin: 52px auto 28px;
  font-size: clamp(4rem, 8vw, 8.5rem);
  line-height: 0.86;
  letter-spacing: -0.065em;
  text-align: center;
}

.attribution { color: var(--soft-ink); font-family: 'Newsreader', Georgia, serif; font-size: 0.9rem; font-style: italic; text-align: center; }
.manifesto-note { width: min(390px, 100%); margin: 110px 0 0 auto; padding-top: 20px; border-top: 1px solid var(--rule); }
.manifesto-note p { margin-bottom: 12px; font-family: 'Newsreader', Georgia, serif; font-size: 1.35rem; line-height: 1.35; }
.manifesto-note span { color: var(--soft-ink); font-size: 0.59rem; font-weight: 600; letter-spacing: 0.13em; text-transform: uppercase; }

.fromh-footer {
  min-height: 300px;
  padding: 70px max(32px, calc((100vw - 1440px) / 2));
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  color: var(--paper);
  background: var(--ink);
}

.footer-mark { color: var(--paper); font-size: 3.2rem; }
.fromh-footer > div:first-child p { margin-top: 8px; color: #bcb1a2; font-family: 'Newsreader', Georgia, serif; font-size: 0.95rem; }
.footer-links { display: flex; gap: 36px; }
.footer-links a { padding-bottom: 5px; border-bottom: 1px solid #786f64; color: var(--paper); font-size: 0.63rem; font-weight: 600; letter-spacing: 0.13em; text-decoration: none; text-transform: uppercase; }
.footer-year { justify-self: end; color: #8e8376; font-family: 'Newsreader', Georgia, serif; font-size: 0.75rem; letter-spacing: 0.2em; }

[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 800ms ease, transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
}

[data-reveal].is-visible { opacity: 1; transform: translateY(0); }

@keyframes slow-turn { to { transform: rotate(360deg); } }

@media (max-width: 900px) {
  .site-header,
  .hero,
  .collection,
  .manifesto { width: min(100% - 40px, 700px); }
  .site-header { grid-template-columns: 1fr 1fr; }
  .header-note { display: none; }
  .hero { min-height: auto; grid-template-columns: 1fr; padding-top: 30px; }
  .hero-copy { padding: 13vh 0 8vh; }
  .hero h1 { font-size: clamp(3.4rem, 13vw, 6.5rem); }
  .hero h1 span { margin: 10px 0 0; white-space: normal; }
  .hero-mark { display: none; }
  .hero-intro { grid-column: 1; margin-top: 7vh; }
  .scroll-note { display: none; }
  .collection { padding-top: 100px; }
  .section-heading { grid-template-columns: 1fr; gap: 38px; margin-bottom: 100px; }
  .section-heading > p:last-child { justify-self: start; }
  .product { grid-template-columns: 1fr; min-height: 0; padding-bottom: 90px; margin-bottom: 60px; }
  .product-visual { min-height: min(580px, 105vw); }
  .product-copy { padding: 60px 0 0; }
  .product--ctrld .product-visual,
  .product--ctrld .product-copy { grid-column: 1; grid-row: auto; }
  .fromh-footer { grid-template-columns: 1fr auto; gap: 70px 20px; }
  .footer-links { grid-column: 1 / -1; grid-row: 1; }
}

@media (max-width: 540px) {
  .site-header { min-height: 78px; }
  .wordmark { font-size: 1.7rem; }
  .back-link { font-size: 0; }
  .back-link span { margin: 0; font-size: 1.2rem; }
  .hero h1 { font-size: 3.65rem; }
  .hero-intro p { font-size: 1.05rem; }
  .drop-cap { font-size: 3.8rem; }
  .collection { padding-top: 80px; }
  .section-heading h2 { font-size: 3.5rem; }
  .product-meta { margin-bottom: 25px; }
  .product-visual { min-height: 440px; }
  .product-copy h3 { font-size: 3.8rem; }
  .twelve-brand { gap: 12px; padding: 23px 20px 21px; }
  .twelve-roman { font-size: 3.2rem; }
  .twelve-name strong { font-size: 1rem; }
  .twelve-name small { font-size: 0.42rem; }
  .pact-paper { width: auto; height: 390px; padding: 21px 18px 27px; border-radius: 31px; }
  .pact-head { font-size: 0.34rem; }
  .ctrld-splash { min-height: 255px; }
  .ctrld-logo { margin-top: 58px; font-size: 2.45rem; }
  .ctrld-pronunciation { font-size: 0.4rem; }
  .ctrld-definition { margin-top: 20px; font-size: 0.66rem; }
  .ctrld-definition b { margin-bottom: 6px; font-size: 0.48rem; }
  .ctrld-steps { left: 18px; bottom: 19px; font-size: 0.34rem; }
  .sealed-card { aspect-ratio: 1.1; }
  .manifesto { padding: 90px 0 100px; }
  .manifesto blockquote { font-size: 3.6rem; }
  .manifesto-note { margin-top: 80px; }
  .fromh-footer { min-height: 330px; grid-template-columns: 1fr; align-items: start; }
  .footer-links { grid-column: 1; }
  .footer-year { justify-self: start; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-mark svg { animation: none; }
  .ctrld-logo,
  .ctrld-logo span,
  .ctrld-logo > i,
  .ctrld-splash-entry { animation: none; }
  .ctrld-logo { transform: none; }
  .ctrld-logo span,
  .ctrld-splash-entry { opacity: 1; transform: none; }
  .ctrld-logo > i { opacity: 0; }
  [data-reveal] { opacity: 1; transform: none; transition: none; }
  * { scroll-behavior: auto !important; }
}
</style>
