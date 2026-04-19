import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useTypeOnScroll(targetRef, fullText, opts = {}) {
  const speed = opts.speed ?? 80;
  const threshold = opts.threshold ?? 0.3;

  const displayed = ref('');
  const done = ref(false);

  let observer = null;
  let typingTimer = null;
  let started = false;

  function typeNext(index) {
    if (index > fullText.length) {
      done.value = true;
      return;
    }
    displayed.value = fullText.substring(0, index);
    typingTimer = setTimeout(() => typeNext(index + 1), speed);
  }

  function startTyping() {
    if (started) return;
    started = true;
    typeNext(0);
  }

  onMounted(() => {
    const el = targetRef.value;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      startTyping();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            startTyping();
            observer.disconnect();
            observer = null;
            break;
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
  });

  onBeforeUnmount(() => {
    if (observer) observer.disconnect();
    if (typingTimer) clearTimeout(typingTimer);
  });

  return { displayed, done };
}
