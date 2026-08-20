document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.remove('closed'));
    menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => mobileMenu.classList.add('closed'));
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('closed');
      mobileMenu.classList.remove('open');
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Services dropdown (desktop)
  const dropdownBtn = document.getElementById('services-dropdown-btn');
  const dropdownMenu = document.getElementById('services-dropdown-menu');
  if (dropdownBtn && dropdownMenu) {
    let timeout;
    dropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownMenu.classList.toggle('hidden');
    });
    dropdownBtn.parentElement.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => dropdownMenu.classList.add('hidden'), 150);
    });
    dropdownBtn.parentElement.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
    });
  }

  // Services dropdown (mobile)
  const mobileDropdownBtn = document.getElementById('mobile-services-btn');
  const mobileDropdownMenu = document.getElementById('mobile-services-menu');
  if (mobileDropdownBtn && mobileDropdownMenu) {
    mobileDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileDropdownMenu.classList.toggle('hidden');
      const arrow = mobileDropdownBtn.querySelector('svg');
      if (arrow) arrow.classList.toggle('rotate-180');
    });
  }

  // Form validation
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let valid = true;
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('border-red-400');
          field.classList.remove('border-gray-200');
        } else {
          field.classList.remove('border-red-400');
          field.classList.add('border-gray-200');
        }
      });
      const email = form.querySelector('input[type="email"]');
      if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
          valid = false;
          email.classList.add('border-red-400');
        }
      }
      if (!valid) {
        e.preventDefault();
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Counter animation for stats
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          const suffix = entry.target.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = Math.ceil(target / 50);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            entry.target.textContent = current + suffix;
          }, 30);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    counters.forEach(counter => observer.observe(counter));
  }

  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-6');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700');
      fadeObserver.observe(el);
    });
  }
});
