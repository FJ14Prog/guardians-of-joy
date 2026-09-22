// ======================================================
// HEADER AMB CANVI D'ESTIL EN FER SCROLL
// ======================================================

const siteHeader = document.getElementById("siteHeader");
const backToTop = document.getElementById("backToTop");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  !prefersReducedMotion &&
  document.documentElement.classList.contains("hero-intro")
) {
  window.setTimeout(() => {
    document.documentElement.classList.remove("hero-intro");
    document.documentElement.classList.add("hero-intro-complete");
    updateHeroMotion();
  }, 1700);
} else {
  document.documentElement.classList.remove("hero-intro");
}

function updateHeader() {
  const isScrolled = window.scrollY > 60;

  if (siteHeader) {
    if (isScrolled) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }

  if (backToTop) {
    backToTop.classList.toggle(
      "visible",
      window.scrollY > 600
    );
  }
}

window.addEventListener("scroll", updateHeader);

updateHeader();


// ======================================================
// MENÚ MÒBIL
// ======================================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function closeMenu() {
  document.body.classList.remove("menu-open");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Obrir menú");
  }
}

function openMenu() {
  document.body.classList.add("menu-open");

  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Tancar menú");
  }
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      closeMenu();
    }
  });
}

// ======================================================
// MANIFEST - ENTRADA EDITORIAL PRÒPIA
// ======================================================

const manifestSection = document.getElementById("manifestSection");

if (manifestSection && !prefersReducedMotion && "IntersectionObserver" in window) {
  manifestSection.classList.add("manifest-animate");

  const manifestObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("manifest-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.22,
    }
  );

  manifestObserver.observe(manifestSection);
} else if (manifestSection) {
  manifestSection.classList.remove("manifest-animate");
  manifestSection.classList.remove("manifest-visible");
}


// ======================================================
// REVEAL D'ELEMENTS QUAN ENTREN A PANTALLA
// ======================================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// ======================================================
// PARALLAX MOLT SUAU AL HERO
// Respecta la preferència del sistema per reduir moviment.
// ======================================================

const heroMedia = document.querySelector(".hero-media");
const heroExitElements = {
  eyebrow: document.querySelector(".hero-eyebrow"),
  titleLines: document.querySelectorAll(".hero-title-line"),
  copy: document.querySelector(".hero-copy"),
  cta: document.querySelector(".hero-cta"),
  index: document.querySelector(".hero-index"),
  scrollLabel: document.querySelector(".scroll-label"),
  seal: document.querySelector(".hero-seal"),
};

const heroExitRange = 260;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeProgress(progress, start, end) {
  return clamp((progress - start) / (end - start), 0, 1);
}

function applyHeroExit(
  element,
  progress,
  start,
  end,
  distance,
  finalOpacity = 0,
  baseOpacity = 1
) {
  if (!element) {
    return;
  }

  const localProgress = normalizeProgress(progress, start, end);
  const opacity =
    baseOpacity - ((baseOpacity - finalOpacity) * localProgress);
  const translateY = -distance * localProgress;

  element.style.opacity = opacity.toFixed(3);
  element.style.transform = `translateY(${translateY.toFixed(2)}px)`;
}

function updateHeroExit(scrollPosition) {
  if (document.documentElement.classList.contains("hero-intro")) {
    return;
  }

  const progress = clamp(scrollPosition / heroExitRange, 0, 1);

  applyHeroExit(heroExitElements.copy, progress, 0, 0.65, 12);
  applyHeroExit(heroExitElements.cta, progress, 0.05, 0.68, 12);
  applyHeroExit(heroExitElements.index, progress, 0.05, 0.72, 10);
  applyHeroExit(heroExitElements.scrollLabel, progress, 0.05, 0.72, 10);
  applyHeroExit(heroExitElements.eyebrow, progress, 0.18, 0.85, 10);

  heroExitElements.titleLines.forEach((line) => {
    applyHeroExit(line, progress, 0.25, 1, 18, 0.08);
  });

  applyHeroExit(heroExitElements.seal, progress, 0.42, 1, 8, 0.16, 0.92);
}

function updateHeroMotion() {
  const scrollPosition = window.scrollY;

  if (heroMedia && scrollPosition < window.innerHeight) {
    heroMedia.style.transform =
      `translateY(${scrollPosition * 0.12}px)`;
  }

  updateHeroExit(scrollPosition);
}

if (heroMedia && !prefersReducedMotion) {
  window.addEventListener("scroll", updateHeroMotion);
  updateHeroMotion();
}


// ======================================================
// NEWSLETTER - PROVISIONAL
// Més endavant el connectarem al sistema real.
// ======================================================

const newsletterForm =
  document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const button =
      newsletterForm.querySelector("button");

    if (button) {
      button.textContent = "Ja hi ets ✓";
    }

    newsletterForm.reset();
  });
}

// ======================================================
// ANY AUTOMÀTIC DEL FOOTER
// ======================================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
