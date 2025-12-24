import ScrollReveal from "scrollreveal";
document.addEventListener("DOMContentLoaded", () => {
  ScrollReveal().reveal(".scroll-reveal", {
    duration: 1000,
    origin: "top",
    distance: "50px",
    easing: "ease-in-out",
    reset: true,
  });

  ScrollReveal().reveal(".scroll-reveal-bottom", {
    duration: 1000,
    origin: "bottom",
    distance: "100px",
    easing: "ease-in-out",
    reset: true,
  });

  ScrollReveal().reveal(".scroll-reveal-left", {
    duration: 1000,
    origin: "left",
    distance: "50px",
    easing: "ease-in-out",
    reset: true,
  });

  ScrollReveal().reveal(".scroll-reveal-left-step-1", {
    duration: 1000,
    origin: "left",
    distance: "100px",
    easing: "ease-in-out",
    reset: true,
  });

  ScrollReveal().reveal(".scroll-reveal-left-step-2", {
    duration: 1000,
    origin: "left",
    distance: "150px",
    easing: "ease-in-out",
  });

  ScrollReveal().reveal(".scroll-reveal-right", {
    duration: 1000,
    origin: "right",
    distance: "50px",
    easing: "ease-in-out",
    reset: true,
  });

  ScrollReveal().reveal(".scroll-reveal-top", {
    duration: 1000,
    origin: "top",
    distance: "50px",
    easing: "ease-in-out",
    reset: true,
  });

  // Get the navbar element outside of the function so it can be reused
  const navbar = document.querySelector("header");
  function handleScroll() {
    const mobile_tabs = document.querySelector(".mobile-tabs");
    const footer = document.querySelector("footer");
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.classList.add("fixed-header");
        mobile_tabs.classList.add("scrolled-down");
      } else {
        navbar.classList.remove("fixed-header");
        mobile_tabs.classList.remove("scrolled-down");
      }
    }
    // Ensure footer and scroll-to-top elements exist before using them
    if (footer) {
      const footerPosition = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerPosition.top < windowHeight) {
        mobile_tabs.classList.remove("scrolled-down");
      }
    }

    const heroSlider = document.querySelector("#hero-slider");
    if (window.scrollY > 10) {
      heroSlider.classList.add("scrolled-slider");
    } else {
      heroSlider.classList.remove("scrolled-slider");
    }

  }
  window.addEventListener("scroll", handleScroll);
});

// Navbar
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbarCollapse = document.getElementById("navbar-collapse");
  const menuOpenIcon = document.querySelector(".menu-open-icon");
  const menuCloseIcon = document.querySelector(".menu-close-icon");

  if (menuToggle && navbarCollapse) {
    // Menü toggle fonksiyonu
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Tıklamanın document'a yayılmasını engelle
      navbarCollapse.classList.toggle("show");

      // İkonlar arasında geçiş yap
      menuOpenIcon.classList.toggle("hidden");
      menuOpenIcon.classList.toggle("block");
      menuCloseIcon.classList.toggle("hidden");
      menuCloseIcon.classList.toggle("block");
    });

    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener("click", (e) => {
      if (
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(e.target) &&
        e.target !== menuToggle &&
        !menuToggle.contains(e.target)
      ) {
        navbarCollapse.classList.remove("show");

        // İkonları sıfırla - menü kapandığında hamburger ikonunu göster
        menuOpenIcon.classList.remove("hidden");
        menuOpenIcon.classList.add("block");
        menuCloseIcon.classList.add("hidden");
        menuCloseIcon.classList.remove("block");
      }
    });

    // Ekran boyutu değiştiğinde menüyü kontrol et
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        // Masaüstü ekranlarda show sınıfını kaldır
        navbarCollapse.classList.remove("show");

        // İkonları sıfırla - menü kapandığında hamburger ikonunu göster
        menuOpenIcon.classList.remove("hidden");
        menuOpenIcon.classList.add("block");
        menuCloseIcon.classList.add("hidden");
        menuCloseIcon.classList.remove("block");
      }
    });

    // Menü içindeki bağlantılara tıklandığında menüyü kapat (mobil görünümde)
    const navLinks = navbarCollapse.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 1024) {
          navbarCollapse.classList.remove("show");
        }
      });
    });
  }
});

/* Video Modal */
document.addEventListener("DOMContentLoaded", function () {
  // Video Modal Sistemi
  const videoModal = document.getElementById("videoModal");
  const videoContainer = document.getElementById("videoContainer");
  const closeModal = document.getElementById("closeModal");
  const videoThumbnails = document.querySelectorAll(".video-thumbnail-container");

  if (videoModal && videoContainer && closeModal && videoThumbnails.length > 0) {
    // Thumbnail'lara tıklama event'i
    videoThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        const videoId = this.dataset.videoId;
        if (videoId) {
          // Modal'ı göster
          videoModal.classList.remove("hidden");
          videoModal.classList.add("flex");

          // Video iframe'ini oluştur ve ekle
          const iframe = document.createElement("iframe");
          iframe.setAttribute("width", "100%");
          iframe.setAttribute("height", "100%");
          iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          );
          iframe.setAttribute("allowfullscreen", "");
          iframe.setAttribute("title", "Video Player");

          // Mevcut içeriği temizle ve iframe'i ekle
          videoContainer.innerHTML = "";
          videoContainer.appendChild(iframe);

          // Body scroll'unu engelle
          document.body.style.overflow = "hidden";
        }
      });
    });

    // Modal kapatma fonksiyonu
    const closeVideoModal = () => {
      videoModal.classList.add("hidden");
      videoModal.classList.remove("flex");
      videoContainer.innerHTML = ""; // Video'yu durdur
      document.body.style.overflow = "auto"; // Body scroll'unu geri aç
    };

    // Close button'a tıklama
    closeModal.addEventListener("click", closeVideoModal);

    // Modal dışına tıklama
    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });

    // ESC tuşu ile kapatma
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !videoModal.classList.contains("hidden")) {
        closeVideoModal();
      }
    });
  }
});

/* Vue 
import { createApp, ref } from 'vue';
createApp({
  setup() {
    const activeForm = ref('login');
    const setActiveForm = (formName) => {
      activeForm.value = formName;
    };
    return {
      activeForm,
      setActiveForm
    };
  }
}).mount('#loginFormAndQueryApp');
*/

/* CountUp.js */
import { CountUp } from "countup.js";
document.querySelectorAll(".countup").forEach((el) => {
  const value = parseInt(el.dataset.value);
  if (!isNaN(value)) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = new CountUp(el, value);
            if (!counter.error) {
              counter.start();
              obs.unobserve(el);
            } else {
              console.error(counter.error);
            }
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(el);
  }
});
/* CountUp.js - End */

import { animate, splitText, stagger } from "animejs";

// Tüm hedefleri seç
const allSplitElements = document.querySelectorAll(".split-text-repeat, .split-text-once");

allSplitElements.forEach((element) => {
  const { words } = splitText(element);
  const shouldLoop = element.classList.contains("split-text-repeat");
  animate(words, {
    y: ["100%", "0%"], // Aşağıdan (%100) -> Yerine (%0)
    opacity: [0, 1], // Görünmezden -> Görünüre (Garanti olsun diye)
    duration: 800,
    delay: stagger(100), // Kelimeler arası 100ms gecikme
    easing: "easeOutCubic",
    loop: shouldLoop,
  });
});

//EMBLA CAROUSEL
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import ClassNames from 'embla-carousel-class-names';

// Hero Mission Vision Slider
const emblaNode = document.querySelector('.hero-msvs-slider');
if (emblaNode) {
  const emblaApi = EmblaCarousel(emblaNode, {
    loop: true,
    watchDrag: false,
    duration: 40
  }, [
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      playOnInit: true
    }),
    WheelGesturesPlugin(),
    ClassNames({ selected: 'is-in-view' })
  ]);
} else {
  console.error("Hata: .hero-msvs-slider elementi bulunamadı. HTML yapısını kontrol edin.");
}
// Hero Mission Vision Slider - End

/*
 * Modal
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2024 - Licensed under MIT
 */
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const scrollbarWidthCssVar = "--pico-scrollbar-width";
const animationDuration = 400;

let visibleModal = null;

// OPEN
const openModal = (modal) => {
  const html = document.documentElement;
  const scrollbarWidth = window.innerWidth - html.clientWidth;

  if (scrollbarWidth) {
    html.style.setProperty(scrollbarWidthCssVar, `${scrollbarWidth}px`);
  }

  html.classList.add(isOpenClass, openingClass);
  modal.showModal();

  const anyVideo = modal.querySelector("video");
  if (anyVideo) {
    anyVideo.play();
    anyVideo.currentTime = 0;
  }

  setTimeout(() => {
    visibleModal = modal;
    html.classList.remove(openingClass);
  }, animationDuration);
};

// CLOSE
const closeModal = (modal) => {
  const html = document.documentElement;

  html.classList.add(closingClass);

  const anyVideo = modal.querySelector("video");
  if (anyVideo) {
    anyVideo.pause();
    anyVideo.currentTime = 0;
  }

  setTimeout(() => {
    html.classList.remove(closingClass, isOpenClass);
    html.style.removeProperty(scrollbarWidthCssVar);
    modal.close();
    visibleModal = null;
  }, animationDuration);
};

// CLICK HANDLER
document.addEventListener("click", (event) => {
  const openBtn = event.target.closest("[data-target]");
  const closeBtn = event.target.closest("[data-close]");

  if (openBtn) {
    event.preventDefault();
    const modal = document.getElementById(openBtn.dataset.target);
    modal && openModal(modal);
  }

  if (closeBtn && visibleModal) {
    closeModal(visibleModal);
  }

  if (visibleModal) {
    const article = visibleModal.querySelector("article");
    if (!article.contains(event.target)) {
      closeModal(visibleModal);
    }
  }
});

// ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && visibleModal) {
    closeModal(visibleModal);
  }
});

// Services Slider
const setupServicesSlider = () => {
  const emblaNode = document.querySelector('#services-embla');
  if (!emblaNode) return;

  // Sadece bu slider'ın içindeki butonları bulmak için:
  const parent = emblaNode.closest('.services-slider');
  const prevBtn = parent.querySelector('.prev-btn');
  const nextBtn = parent.querySelector('.next-btn');

  const options = {
    loop: true,
    align: 'start'
    // containScroll: 'trimSnaps' // Loop true ise buna genelde gerek kalmaz
  };

  const autoplay = Autoplay({
    delay: 4000,
    stopOnInteraction: false
  });

  const emblaApi = EmblaCarousel(emblaNode, options, [autoplay]);

  if (prevBtn) prevBtn.addEventListener('click', () => emblaApi.scrollPrev());
  if (nextBtn) nextBtn.addEventListener('click', () => emblaApi.scrollNext());

  // Mobil sürüklemeyi iyileştirmek için (opsiyonel)
  emblaApi.on('pointerDown', () => autoplay.stop());
};

// Fonksiyonu çağırdığından emin ol
document.addEventListener('DOMContentLoaded', setupServicesSlider);