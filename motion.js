import { animate, inView } from "https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm";

const REVEAL_SELECTOR = [
  ".block-image img",
  ".block-placeholder",
  ".block-placeholders",
  ".block-two-up img"
].join(", ");

inView(REVEAL_SELECTOR, ({ target }) => {
  target.classList.add("revealed");
  animate(
    target,
    { opacity: [0, 1], y: [48, 0] },
    { duration: 0.5, easing: [0.16, 1, 0.3, 1] }
  );
});

inView("video", ({ target }) => {
  const tryPlay = () => target.play().catch(() => {});
  tryPlay();
  target.addEventListener("loadeddata", tryPlay, { once: true });
});

const playAllVisibleVideos = () => {
  document.querySelectorAll("video").forEach((v) => v.play().catch(() => {}));
};
window.addEventListener("touchstart", playAllVisibleVideos, { once: true, passive: true });
window.addEventListener("click", playAllVisibleVideos, { once: true });
