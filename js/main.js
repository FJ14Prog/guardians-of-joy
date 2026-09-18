// ======================================================
// HEADER AMB CANVI D'ESTIL EN FER SCROLL
// ======================================================

const siteHeader = document.getElementById("siteHeader");

function updateHeader() {
  if (!siteHeader) {
    return;
  }

  if (window.scrollY > 60) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
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
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (heroMedia && !prefersReducedMotion) {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {
      heroMedia.style.transform =
        `translateY(${scrollPosition * 0.12}px)`;
    }
  });
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
