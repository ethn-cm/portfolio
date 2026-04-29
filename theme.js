(() => {
  document.documentElement.classList.add("js");

  if (!sessionStorage.getItem("introSeen")) {
    document.documentElement.classList.add("intro");
    sessionStorage.setItem("introSeen", "1");
  }

  const stored = localStorage.getItem("theme");
  if (stored === "dark") document.documentElement.setAttribute("data-theme", "dark");

  const syncThemeColor = () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    let meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", isDark ? "#000000" : "#ffffff");
  };

  syncThemeColor();

  document.addEventListener("DOMContentLoaded", () => {
    syncThemeColor();
    const btn = document.querySelector(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDark) {
          document.documentElement.removeAttribute("data-theme");
          localStorage.setItem("theme", "light");
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
        }
        syncThemeColor();
      });
    }

    const header = document.querySelector(".site-header");
    const navBtn = document.querySelector(".nav-toggle");
    if (header && navBtn) {
      navBtn.addEventListener("click", () => {
        const open = header.classList.toggle("is-open");
        navBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      header.querySelectorAll("nav a").forEach((a) => {
        a.addEventListener("click", () => {
          header.classList.remove("is-open");
          navBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    let lastY = window.scrollY;
    let ticking = false;
    const THRESHOLD = 40;
    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY + 2;
      const goingUp = y < lastY - 2;
      const past = y > THRESHOLD;
      if (goingDown && past) {
        if (header && header.classList.contains("is-open")) {
          header.classList.remove("is-open");
          if (navBtn) navBtn.setAttribute("aria-expanded", "false");
        }
        document.documentElement.classList.add("nav-hidden");
      } else if (goingUp || y <= 0) {
        document.documentElement.classList.remove("nav-hidden");
      }
      lastY = y;
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  });
})();
